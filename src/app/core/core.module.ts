import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggingModule } from './logging/logging.module';
import {ErrorInterceptor} from './error.interceptor';
import {AppConfig} from './config/app-config';
import { CookieBannerComponent } from './cookie-banner/cookie-banner.component';
import {MatButtonModule} from '@angular/material/button';
import {JsonInterceptor} from './json.interceptor';


@NgModule({
  declarations: [CookieBannerComponent],
  imports: [
    CommonModule,
    LoggingModule.forRoot(),
    MatButtonModule
  ],
  exports: [
    LoggingModule,
    CookieBannerComponent
  ],
  providers: [
    AppConfig,
    ErrorInterceptor,
    JsonInterceptor
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if(parentModule) {
      throw new Error('CoreModule has already been loaded! Import the core modules in AppModule only.');
    }
  }
}
