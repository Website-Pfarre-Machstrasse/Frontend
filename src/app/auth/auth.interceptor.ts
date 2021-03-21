import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add JWT auth header if a user is logged in
    if (this._authService.isAuthenticated()) {
      const accessToken = this._authService.getAccessToken();
      const refreshToken = this._authService.getRefreshToken();
      if (!request.headers.has('Authorization')) {
        if (accessToken) {
          request = request.clone({
            setHeaders: {Authorization: `Bearer ${accessToken}`},
          });
        } else if (refreshToken) {
          request = request.clone({
            setHeaders: {Authorization: `Bearer ${refreshToken}`},
          });
        }
      }
    }

    return next.handle(request);
  }
}
