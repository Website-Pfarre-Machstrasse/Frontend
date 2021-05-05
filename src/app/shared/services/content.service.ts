import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { UploadResult } from 'src/app/data/upload-result';
import {Category, CategoryDTO} from '../../data/category';
import {Page, PageDTO} from '../../data/page';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../core/config/app-config';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly _url: string;

  constructor(private _http: HttpClient) {
    this._url = AppConfig.INSTANCE.apiEndpoint;
  }

  public getCategories(): Observable<Category[]> {
    return this._http.get<CategoryDTO[]>(`${this._url}/category`)
      .pipe(map(this.dtoToCategory.bind(this)));
  }

  public getCategory(categoryId: string): Observable<Category> {
    return this._http.get<CategoryDTO>(`${this._url}/category/${categoryId}`)
      .pipe(map(this.dtoToCategory.bind(this)));
  }

  public getPages(categoryId: string): Observable<Page[]> {
    return this._http.get<PageDTO[]>(`${this._url}/category/${categoryId}/page`)
      .pipe(map(this.dtoToPage.bind(this)));
  }

  public getPage(categoryId: string, pageId: string): Observable<Page> {
    return this._http.get<PageDTO>(`${this._url}/category/${categoryId}/page/${pageId}`)
      .pipe(map(this.dtoToPage.bind(this)));
  }

  public getPageContent(categoryId: string, pageId: string): Observable<string> {
    return this._http.get<string>(`${this._url}/category/${categoryId}/page/${pageId}/content`);
  }

  public uploadFile(file: File): Promise<UploadResult> {
    return new Promise<UploadResult>(resolve => {
      resolve({
        name: file.name,
        url: '',
        media: file.type.startsWith('image') || file.type.startsWith('video') || file.type.startsWith('audio')
      });
    });
  }

  public saveContent(categoryId: string, pageId: string, content: string): Observable<string> {
    return this._http.put<string>(`${this._url}/category/${categoryId}/page/${pageId}/content`, content);
  }

  private dtoToCategory(dto: (CategoryDTO | CategoryDTO[])): (Category | Category[]) {
    if (Array.isArray(dto)) {
      return dto.map(this.dtoToCategory.bind(this));
    } else {
      const ref = this;
      const cat = {
        get pages$(): Observable<Page[]> {
          return ref.getPages(this.id);
        }
      };
      Object.keys(dto).forEach(key => cat[key] = dto[key]);
      return cat as Category;
    }
  }

  private dtoToPage(dto: (PageDTO | PageDTO[])): (Page | Page[]) {
    if (Array.isArray(dto)) {
      return dto.map(this.dtoToPage.bind(this));
    } else {
      const ref = this;
      const page = {
        get content$(): Observable<string> {
          return ref.getPageContent(this.category, this.id);
        }
      };
      Object.keys(dto).forEach(key => page[key] = dto[key]);
      return page as Page;
    }
  }
}
