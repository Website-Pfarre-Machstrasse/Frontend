import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxSubscribeDirective } from './directives/rx-subscribe.directive';
import { RendererComponent } from './components/renderer/renderer.component';
import {ShowdownModule} from 'ngx-showdown';
import {ContentService} from './services/content.service';
import {EventService} from './services/event.service';
import {MediaService} from './services/media.service';
import { ImageFallbackDirective } from './directives/image-fallback.directive';
import { MediaBrowserComponent } from './components/media-browser/media-browser.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [RxSubscribeDirective, RendererComponent, MediaBrowserComponent, ImageFallbackDirective],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ShowdownModule
  ],
  exports: [RxSubscribeDirective, RendererComponent, MediaBrowserComponent, ImageFallbackDirective],
  providers: [
    ContentService,
    EventService,
    MediaService
  ],
  entryComponents: [MediaBrowserComponent]
})
export class SharedModule { }
