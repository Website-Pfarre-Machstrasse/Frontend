import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContentService} from '../../shared/services/content.service';
import {Observable, of, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-page-renderer',
  templateUrl: './page-renderer.component.html',
  styleUrls: ['./page-renderer.component.scss']
})
export class PageRendererComponent implements OnInit, OnDestroy {
  content$: Observable<string>;

  constructor(private _route: ActivatedRoute, private _router: Router, private _contentService: ContentService, private _auth: AuthService) {
    this.content$ = this._route.params
      .pipe(
        switchMap(({cat, page}) => (this._contentService.getPageContent(cat, page) ?? throwError(new Error()))),
        catchError(() => of(''))
      );
  }

  ngOnInit(): void {
    let themeStyle = document.getElementById('themeStyle') as HTMLLinkElement;
    if (!themeStyle) {
      themeStyle = document.createElement('link');
    }
    themeStyle.href = 'page-renderer.css';
    themeStyle.rel = 'stylesheet';
    themeStyle.id = 'themeStyle';
    document.head.appendChild(themeStyle);
  }

  ngOnDestroy(): void {
    document.getElementById('themeStyle')?.remove();
  }

  canEdit(): Observable<boolean> {
    return this._auth.isAuthenticated();
  }

  edit(): void {
    this._router.navigate(['editor'], {queryParams: this._route.snapshot.params});
  }
}
