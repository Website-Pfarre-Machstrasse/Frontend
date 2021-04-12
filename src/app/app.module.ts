import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {AuthModule} from './auth/auth.module';
import {AppConfig} from './core/config/app-config';
import {NavComponent} from './core/nav/nav.component';
import {HeaderComponent} from './core/header/header.component';
import {FooterComponent} from './core/footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from './shared/shared.module';
import {AuthService} from './auth/auth.service';
import {ShowdownModule} from 'ngx-showdown';

export const initializeApp = (appConfig: AppConfig, authService: AuthService) => (): Promise<void> => new Promise<void>(resolve => {
    appConfig.load().then(() => authService.refreshToken().subscribe().add(resolve));
  });

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
    ShowdownModule.forRoot({emoji: true, noHeaderId: true, flavor: 'github'})
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig, AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
