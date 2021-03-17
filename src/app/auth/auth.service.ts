import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, delay, map, tap} from 'rxjs/operators';
import {LoggerService} from '../core/logging/logger.service';
import {Logger} from '../core/logging/logger';
import {User} from './user';
import {LoginResult} from './login-result';
import {AppConfig} from '../core/config/app-config';


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

  private static getTokenRemainingTime(): number {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return 0;
    }
    const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    return expires.getTime() - Date.now();
  }

  public ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
  }

  public login(username: string, password: string): Observable<boolean> {
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
    this.clearLocalStorage();
    this._user$.next(null);
    this.stopTokenTimer();
    this._router.navigate(['']);
    this._logger.info('Logout', 'Logout successful');
  }

  public refreshToken(): Observable<LoginResult> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      this.clearLocalStorage();
      return of(null);
    }

    return this._http
      .post<LoginResult>(this.refreshUrl, {}, {headers: {Authorization: `Bearer ${refreshToken}`}})
      .pipe(
        map((x) => {
          this.setLocalStorage(x);
          this.startTokenTimer();
          this.updateUser();
          return x;
        }),
        catchError(() => of(null))
      );
  }

  public setLocalStorage(x: LoginResult): void {
    localStorage.setItem('access_token', x.access_token);
    localStorage.setItem('refresh_token', x.refresh_token ?? null);
    localStorage.setItem('login-event', 'login' + Math.random());
  }

  public clearLocalStorage(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.setItem('logout-event', 'logout' + Math.random());
  }

  private updateUser(): void {
    this._http.get<User>(this.userUrl)
      .subscribe(value => this._user$.next({ username: value.username, role: value.role }));
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

  private startTokenTimer(): void {
    const timeout = AuthService.getTokenRemainingTime();
    this._timer = of<void>()
      .pipe(
        delay(timeout),
        // eslint-disable-next-line rxjs/no-nested-subscribe
        tap(() => this.refreshToken().subscribe())
      ).subscribe();
  }

  private stopTokenTimer(): void {
    this._timer?.unsubscribe();
  }
}
