import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxSubscribeDirective } from './directives/rx-subscribe.directive';
import {ContentService} from './services/content.service';

@NgModule({
  declarations: [RxSubscribeDirective],
  imports: [
    CommonModule
  ],
  exports: [RxSubscribeDirective],
  providers: [
    ContentService
  ]
})
export class SharedModule { }
