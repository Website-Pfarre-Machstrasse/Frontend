import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxSubscribeDirective } from './directives/rx-subscribe.directive';
import { RendererComponent } from './components/renderer/renderer.component';
import {ShowdownModule} from 'ngx-showdown';
import {ContentService} from './services/content.service';
import {EventService} from './services/event.service';
import {MediaService} from './services/media.service';
import { ImageFallbackDirective } from './directives/image-fallback.directive';

@NgModule({
  declarations: [RxSubscribeDirective, RendererComponent, ImageFallbackDirective],
  imports: [
      CommonModule,
      ShowdownModule
  ],
  exports: [RxSubscribeDirective, RendererComponent, ImageFallbackDirective],
  providers: [
    ContentService,
    EventService,
    MediaService
  ]
})
export class SharedModule { }
