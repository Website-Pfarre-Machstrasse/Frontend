import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxSubscribeDirective } from './directives/rx-subscribe.directive';
import { RendererComponent } from './components/renderer/renderer.component';
import {ShowdownModule} from 'ngx-showdown';
import {ContentService} from './services/content.service';
import {EventService} from './services/event.service';
import {MediaService} from './services/media.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [RxSubscribeDirective, RendererComponent],
  imports: [
      CommonModule,
      ShowdownModule
  ],
  exports: [RxSubscribeDirective, RendererComponent],
  providers: [
    ContentService,
    EventService,
    MediaService,
    UserService
  ]
})
export class SharedModule { }
