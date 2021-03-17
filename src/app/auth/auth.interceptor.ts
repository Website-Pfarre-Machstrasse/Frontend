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
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${accessToken}`},
      });
    }

    return next.handle(request);
  }
}
