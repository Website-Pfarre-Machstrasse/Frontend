import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContentService} from '../../shared/services/content.service';
import {Observable, of, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-page-renderer',
  templateUrl: './page-renderer.component.html',
  styleUrls: ['./page-renderer.component.scss']
})
export class PageRendererComponent implements OnInit, OnDestroy {
  content$: Observable<string>;

  constructor(private _route: ActivatedRoute, private _contentService: ContentService) {
    this.content$ = this._route.params
      .pipe(
        switchMap(({cat, page}) => (this._contentService.getPageContent(cat, page) ?? throwError(new Error()))),
        catchError(() => of(''))//fixme
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
}
