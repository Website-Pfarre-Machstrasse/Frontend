import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxSubscribeDirective } from './directives/rx-subscribe.directive';
import {ContentService} from './services/content.service';
import { RendererComponent } from './components/renderer/renderer.component';

@NgModule({
  declarations: [RxSubscribeDirective, RendererComponent],
  imports: [
    CommonModule
  ],
  exports: [RxSubscribeDirective, RendererComponent],
  providers: [
    ContentService
  ]
})
export class SharedModule { }
