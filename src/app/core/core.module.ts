import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggingModule } from './logging/logging.module';
import {ErrorInterceptor} from './error.interceptor';
import {AppConfig} from './config/app-config';
import {JsonInterceptor} from './json.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


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
    { provide: HTTP_INTERCEPTORS, useClass: JsonInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if(parentModule) {
      throw new Error('CoreModule has already been loaded! Import the core modules in AppModule only.');
    }
  }
}
