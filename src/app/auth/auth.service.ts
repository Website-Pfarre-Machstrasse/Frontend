import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, delay, map, switchMap, tap} from 'rxjs/operators';
import {LoggerService} from '../core/logging/logger.service';
import {Logger} from '../core/logging/logger';
import {User} from '../data/user';
import {LoginResult} from '../data/login-result';
import {AppConfig} from '../core/config/app-config';
import {environment} from '../../environments/environment';


const REFRESH_TOKEN = 'refresh_token';
const ACCESS_TOKEN = 'access_token';

// noinspection JSMethodCanBeStatic
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private _timer: Subscription;
  private _user$ = new BehaviorSubject<User>(null);
  private _logger: Logger;

  get user$(): Observable<User> {
    return this._user$.asObservable();
  }

  private get loginUrl(): string {
    return `${AppConfig.INSTANCE.apiEndpoint}/login`;
  }

  private get refreshUrl(): string {
    return `${AppConfig.INSTANCE.apiEndpoint}/refresh`;
  }

  private get userUrl(): string {
    return `${AppConfig.INSTANCE.apiEndpoint}/user`;
  }

  constructor(private _router: Router, private _http: HttpClient, loggerService: LoggerService) {
    this._logger = loggerService.getLogger('AuthService');
  }

  public ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
  }

  public login(username: string, password: string): Observable<boolean> {
    if (!environment.production) {
      this._user$.next({id: '', email: username, firstName: 'Demo', lastName: 'User', role: 'admin'});
      return of(true);
    }
    return this._http
      .post<LoginResult>(this.loginUrl, { username, password })
      .pipe(
        map((x) => {
          this.setLocalStorage(x);
          this.startTokenTimer();
          this.updateUser();
          return true;
        })
      );
  }

  public isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map(value => !!value));
  }

  public logout(): void {
    this.doLogout();
    this._router.navigate(['']).then();
    this._logger.info('Logout', 'Logout successful');
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  public setLocalStorage(x: LoginResult): void {
    localStorage.setItem(ACCESS_TOKEN, x.accessToken);
    localStorage.setItem(REFRESH_TOKEN, x.refreshToken ?? null);
    localStorage.setItem('login-event', 'login' + Math.random());
  }

  public clearLocalStorage(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.setItem('logout-event', 'logout' + Math.random());
  }

  private getTokenRemainingTime(): number {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return 0;
    }
    const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    return expires.getTime() - Date.now();
  }

  private refreshToken(): Observable<LoginResult> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.doLogout();
      return of(null);
    }

    return this._http
      .post<LoginResult>(this.refreshUrl, {}, {headers: {Authorization: `Bearer ${refreshToken}`}})
      .pipe(
        tap((x) => {
          this.setLocalStorage(x);
          this.startTokenTimer();
          this.updateUser();
        }),
        catchError(() => of(null))
      );
  }

  private updateUser(): void {
    this._http.get<User>(this.userUrl).subscribe(user => this._user$.next(user));
  }

  private doLogout(): void {
    this.clearLocalStorage();
    this._user$.next(null);
    this.stopTokenTimer();
  }

  private startTokenTimer(): void {
    const timeout = this.getTokenRemainingTime();
    this._timer = of<void>()
      .pipe(
        delay(timeout),
        switchMap(() => this.refreshToken())
      ).subscribe();
  }

  private stopTokenTimer(): void {
    this._timer?.unsubscribe();
  }

  private storageEventListener(event: StorageEvent): void {
    if (event.storageArea === localStorage) {
      if (event.key === 'logout-event') {
        this._user$.next(null);
      }
      if (event.key === 'login-event') {
        location.reload();
      }
    }
  }
}
