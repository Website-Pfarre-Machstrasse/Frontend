import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggingModule } from './logging/logging.module';
import {ErrorInterceptor} from './error.interceptor';
import {AppConfig} from './config/app-config';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoggingModule.forRoot()
  ],
  exports: [
    LoggingModule
  ],
  providers: [
    AppConfig,
    ErrorInterceptor
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if(parentModule) {
      throw new Error('CoreModule has already been loaded! Import the core modules in AppModule only.');
    }
  }
}
