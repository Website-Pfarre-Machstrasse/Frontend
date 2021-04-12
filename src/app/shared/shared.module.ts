import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxSubscribeDirective } from './directives/rx-subscribe.directive';
import {ContentService} from './services/content.service';
import { RendererComponent } from './components/renderer/renderer.component';
import {ShowdownModule} from 'ngx-showdown';
import {EventService} from './services/event.service';

@NgModule({
  declarations: [RxSubscribeDirective, RendererComponent],
  imports: [
      CommonModule,
      ShowdownModule
  ],
  exports: [RxSubscribeDirective, RendererComponent],
  providers: [
    ContentService,
    EventService
  ]
})
export class SharedModule { }
