import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Category} from '../../data/category';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  public getCategories(): Observable<Category[]> {
    return of([{id: 'test', title: 'Category', pages$: of([{id: 'test', title: 'Page', content$: of('')}])}]);
  }
}
