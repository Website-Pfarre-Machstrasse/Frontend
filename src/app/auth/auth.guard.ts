import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {LoggerService} from '../core/logging/logger.service';
import {Logger} from '../core/logging/logger';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private _logger: Logger;

  constructor(private _authService: AuthService, private _router: Router, loggerService: LoggerService) {
    this._logger = loggerService.getLogger('AuthGuard');
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.isAuthenticated().pipe(map(authenticated => {
      if (authenticated === true) {
        return true;
      }
      this._logger.warn('Not Authorized to access {0}', route.url);
      this._authService.user$.subscribe(user =>
        this._logger.debug('User {0} tried to access {1} but is not Authorized', user, route.url));
      return false;
    }));
  }
}
