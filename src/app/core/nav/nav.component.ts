import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {LoginFormComponent} from '../../auth/login-form/login-form.component';
import {Category} from '../../data/category';
import {ContentService} from '../../shared/services/content.service';
import {User} from '../../data/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent {
  public visible: boolean;
  public openCat: string;

  public get categories$(): Observable<Category[]> {
    return this._contentService.getCategories().pipe(map(v=>v.filter(value => value.id !== '_')));
  }

  public get user$(): Observable<User> {
    return this._userService.user$;
  }

  constructor(private _contentService: ContentService,
              private _userService: AuthService,
              private _loginService: MatDialog) {
  }

  public isLoggedIn(): Observable<boolean> {
    return this._userService.isAuthenticated();
  }

  public logout(): void {
    this._userService.logout();
  }

  public openLogin(): void {
    this._loginService.open(LoginFormComponent, {
      ariaLabel: 'Login',
      height: '21rem'
    });
  }
}
