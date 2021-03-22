import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Category} from '../../data/category';

const MOCK = [];
for (let i = 0; i < 5; i++) {
  const pages = [];
  for (let j = 0; j < 5; j++) {
    pages.push({id: `mock${j}`, title: `Page${j}`, content$: of('')});
  }
  MOCK.push({id: `mock${i}`, title: `Category${i}`, pages$: of(pages)});
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  public getCategories(): Observable<Category[]> {
    return of(MOCK);
  }
}
