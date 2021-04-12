import { Injectable } from '@angular/core';
import { UploadResult } from 'src/app/data/upload-result';
import {Observable, of, throwError} from 'rxjs';
import {Category, CategoryDTO} from '../../data/category';
import {Page, PageDTO} from '../../data/page';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../core/config/app-config';
import {map, switchMap} from 'rxjs/operators';

const TEXT = `
GitHub Flavored Markdown
========================

Everything from markdown plus GFM features:

## URL autolinking

Underscores_are_allowed_between_words.

## Strikethrough text

GFM adds syntax to strikethrough text, which is missing from standard Markdown.

~~Mistaken text.~~
~~**works with other formatting**~~

~~spans across
lines~~

## Fenced code blocks (and syntax highlighting)

\`\`\`javascript
for (var i = 0; i < items.length; i++) {
    console.log(items[i], i); // log them
}
\`\`\`

## Task Lists

- [ ] Incomplete task list item
- [x] **Completed** task list item

## A bit of GitHub spice

See http://github.github.com/github-flavored-markdown/.

(Set \`gitHubSpice: false\` in mode options to disable):

* SHA: be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2
* User@SHA ref: mojombo@be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2
* User/Project@SHA: mojombo/god@be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2
* \\#Num: #1
* User/#Num: mojombo#1
* User/Project#Num: mojombo/god#1

(Set \`emoji: false\` in mode options to disable):

* emoji: :smile:

`;

const MOCK: Category[] = [];
for (let i = 0; i < 5; i++) {
  const pages: Page[] = [];
  const cat = `mock${i}`;
  for (let j = 0; j < 5; j++) {
    pages.push({category: cat, id: `mock${j}`, title: `Page${j}`, order: j, content$: of(TEXT)});
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

  public uploadFile(file: File): Promise<UploadResult> {
    return new Promise<UploadResult>(resolve => {
      resolve({
        name: file.name,
        url: '',
        media: file.type.startsWith('image') || file.type.startsWith('video') || file.type.startsWith('audio')
      });
    });
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
