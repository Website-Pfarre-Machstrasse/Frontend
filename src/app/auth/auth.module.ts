import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {AuthInterceptor} from './auth.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    AuthInterceptor
  ]
})
export class AuthModule {
  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if(parentModule) {
      throw new Error('AuthModule has already been loaded! Import the core modules in AppModule only.');
    }
  }
}
