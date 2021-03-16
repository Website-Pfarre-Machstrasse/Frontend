import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {AuthInterceptor} from './auth.interceptor';
import { LoginFormComponent } from './login-form/login-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    AuthInterceptor
  ],
  exports: [LoginFormComponent]
})
export class AuthModule {
  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if(parentModule) {
      throw new Error('AuthModule has already been loaded! Import the core modules in AppModule only.');
    }
  }
}
