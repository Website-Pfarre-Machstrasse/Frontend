import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {Category, CategoryDTO} from '../../data/category';
import {Page, PageDTO} from '../../data/page';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../core/config/app-config';
import {map, switchMap} from 'rxjs/operators';

const MOCK: Category[] = [];
for (let i = 0; i < 5; i++) {
  const pages: Page[] = [];
  const cat = `mock${i}`;
  for (let j = 0; j < 5; j++) {
    pages.push({category: cat, id: `mock${j}`, title: `Page${j}`, order: j, content$: of('# Hello')});
  }
  MOCK.push({id: cat, title: `Category${i}`, order: i, pages$: of(pages)});
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly _url: string;

  constructor(private _http: HttpClient) {
    this._url = AppConfig.INSTANCE.apiEndpoint;
  }

  public getCategories(): Observable<Category[]> {
    // return this._http.get<CategoryDTO[]>(`${this._url}/category`)
    //   .pipe(map(this.dtoToCategory.bind(this)));
    return of(MOCK);
  }

  public getCategory(categoryId: string): Observable<Category> {
    // return this._http.get<CategoryDTO>(`${this._url}/category/${categoryId}`)
    //   .pipe(map(this.dtoToCategory.bind(this)));
    return of(MOCK.find(value => value.id === categoryId));
  }

  public getPages(categoryId: string): Observable<Page[]> {
    // return this._http.get<PageDTO[]>(`${this._url}/category/${categoryId}/page`)
    //   .pipe(map(this.dtoToPage.bind(this)));
    return MOCK.find(value => value.id === categoryId)?.pages$;
  }

  public getPage(categoryId: string, pageId: string): Observable<Page> {
    // return this._http.get<PageDTO>(`${this._url}/category/${categoryId}/page/${pageId}`)
    //   .pipe(map(this.dtoToPage.bind(this)));
    return MOCK.find(value => value.id === categoryId)?.pages$
      ?.pipe?.(map(value => value.find(value1 => value1.id === pageId)));
  }

  public getPageContent(categoryId: string, pageId: string): Observable<string> {
    // return this._http.get<string>(`${this._url}/category/${categoryId}/page/${pageId}/content`);
    return MOCK.find(value => value.id === categoryId)?.pages$
      ?.pipe?.(switchMap(value => (value.find(value1 => value1.id === pageId)?.content$ ?? throwError(new Error()))));
  }

  private dtoToCategory(dto: (CategoryDTO | CategoryDTO[])): (Category | Category[]) {
    if (Array.isArray(dto)) {
      return dto.map(this.dtoToCategory.bind(this));
    } else {
      const ref = this;
      return {
        ...dto,
        get pages$(): Observable<Page[]> {
          return ref.getPages(this.id);
        }
      } as Category;
    }
  }

  private dtoToPage(dto: (PageDTO | PageDTO[])): (Page | Page[]) {
    if (Array.isArray(dto)) {
      return dto.map(this.dtoToPage.bind(this));
    } else {
      const ref = this;
      return {
        ...dto,
        get content$(): Observable<string> {
          return ref.getPageContent(this.category, this.id);
        }
      } as Page;
    }
  }
}
