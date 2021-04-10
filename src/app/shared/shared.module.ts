import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxSubscribeDirective } from './directives/rx-subscribe.directive';
import {ContentService} from './services/content.service';
import {EventService} from './services/event.service';

@NgModule({
  declarations: [RxSubscribeDirective],
  imports: [
    CommonModule
  ],
  exports: [RxSubscribeDirective],
  providers: [
    ContentService,
    EventService
  ]
})
export class SharedModule { }
