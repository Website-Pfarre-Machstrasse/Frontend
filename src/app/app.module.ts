import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {AuthModule} from './auth/auth.module';
import {AuthService} from './auth/auth.service';
import {AppConfig} from './core/config/app-config';
import {NavComponent} from './core/nav/nav.component';
import {HeaderComponent} from './core/header/header.component';
import {FooterComponent} from './core/footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from './shared/shared.module';
import {ShowdownConfig, ShowdownModule} from 'ngx-showdown';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatButtonModule} from '@angular/material/button';
import * as showdown from 'showdown';

export const initializeApp = (appConfig: AppConfig, authService: AuthService) => (): Promise<void> => new Promise<void>(resolve => {
  appConfig.load().then(() => authService.refreshToken().subscribe().add(resolve));
});

const classMap = {img: 'img-fluid center'};
const bindings = Object.keys(classMap)
  .map(key => ({
    type: 'output',
    regex: new RegExp(`<${key}([^>]*)>`, 'g'),
    replace: `<${key} class="${classMap[key]}" $1>`
  }));

const blocks: {start: string; end?: string; attrs: string; nested?: boolean}[] = [
  {start: ':--', attrs: 'class="text-left"'},
  {start: '-:-', attrs: 'class="text-center"'},
  {start: '--:', attrs: 'class="text-right"'},
  {start: ':-:', attrs: 'class="text-justify"'},
  {start: '-->', end: '<--', attrs: 'class="indent-{i}"'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    AuthModule,
    MatIconModule,
    SharedModule,
    MatButtonModule,
    ShowdownModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig, AuthService],
      multi: true
    },
    {
      provide: ShowdownConfig,
      useValue: {
        emoji: true,
        noHeaderId: true,
        flavor: 'github',
        strikethrough: true,
        tables: true,
        simplifiedAutoLink: true,
        simpleLineBreaks: false,
        requireSpaceBeforeHeadingText: true,
        underline: true,
        extensions: [{
          type: 'output',
          regex: /<li[^>]*><input (?=.*disabled(?:="")?)(?=.*type="checkbox")(?!.*checked)[^>]*>\s*(.*)<\/li>/g,
          replace: '<li style="list-style-type: none;">' +
            '<i class="material-icons">check_box_outline_blank</i> <span style="vertical-align: super">$1</span>' +
            '</li>'
        }, {
          type: 'output',
          regex: /<li[^>]*><input (?=.*disabled(?:="")?)(?=.*type="checkbox")(?=.*checked)[^>]*>\s*(.*)<\/li>/g,
          replace: '<li style="list-style-type: none;">' +
            '<i class="material-icons">check_box</i> <span style="vertical-align: super">$1</span>' +
            '</li>'
        }, {
          type: 'output',
          regex: /<p><img(.+?) src="(.+(mp4|ogg|webm).*?)"(.+?)\/><\/p>/g,
          replace: (match, other1, url, format, other2) => {
            if (url === ('.' + format)) {
              return match;
            } else {
              return `<p><video ${other1} ${other2} controls>`+
                `<source src="${url}" type="video/${format}">`+
                'I am sorry, Your browser does not support the HTML5 <code>video</code> element.'+
                '</video></p>';
            }
          }
        }, {
          type: 'output',
          regex: /<p><img(.+?) src="(.+(mp3|ogg|wav).*?)"(.+?)\/><\/p>/g,
          replace: (match, other1, url, format, other2) => {
            if (url === ('.' + format)) {
              return match;
            } else {
              if ('mp3' === format) {
                format = 'mpeg';
              }
              return `<p><audio ${other1} ${other2} controls>` +
                `<source src="${url}" type="audio/${format}" />` +
                'I am sorry, Your browser does not support the HTML5 <code>audio</code> element.' +
                '</audio></p>';
            }
          }
        }, {
          type: 'output',
          regex: /<p><img(.+?)\/><\/p>/g,
          replace: (match: string, other: string) => {
            other = other.format({server: AppConfig.INSTANCE.apiEndpoint});
            return `<p><img${other}/></p>`;
          }
        }, {
          type: 'listener',
          listeners: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            'blockGamut.before': (event, text, converter, options, glob: any) => {
              if (!glob.blockLevels) {
                glob.blockLevels = {};
              }
              for (const block of blocks) {
                const start = block.start;
                const nested = !!block.end || block.nested;
                const end = block.end || block.start;
                const regex = nested
                  ? new RegExp(`^${start}([\\s\\S]*)${end}$`, 'gm')
                  : new RegExp(`^${start}([\\s\\S]+?)${end}$`, 'gm');
                let attrs;
                if (nested) {
                  if (!(block.start in glob.blockLevels)) {
                    glob.blockLevels[block.start] = 0;
                  }
                  glob.blockLevels[block.start]++;
                  attrs = block.attrs.format({i: glob.blockLevels[block.start]});
                } else {
                  attrs = block.attrs;
                }
                text = text.replace(regex, (wm, txt) => {
                  txt = showdown.subParser('blockGamut')(txt, options, glob);
                  return `<div ${attrs}>${txt}</div>`;
                });
                if (nested) {
                  glob.blockLevels[block.start]--;
                }
              }
              return text;
            }
          }
        }, {
          type: 'lang',
          regex: /(?:^|\n)~ ([^\n]*)(?:$|\n)/g,
          replace: '<span class="quote">$1</span>'
        }, bindings
        ]
      } as ShowdownConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
