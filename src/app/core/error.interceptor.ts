import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {catchError} from 'rxjs/operators';
import {Logger} from './logging/logger';
import {LoggerService} from './logging/logger.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private _logger: Logger;

  constructor(private _authService: AuthService, private _router: Router, loggerService: LoggerService) {
    this._logger = loggerService.getLogger('HTTP');
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // eslint-disable-next-line rxjs/no-implicit-any-catch
      catchError((err) => {
        if (err.status === 401) {
          this._authService.clearLocalStorage();
          this._router.navigate(['']);
          this._logger.error('Authentication error {0}', err?.message ?? err?.error?.message ?? err?.statusText);
        }
        const error = err?.message ?? err?.error?.message ?? err?.statusText;
        return throwError(error);
      })
    );
  }
}
