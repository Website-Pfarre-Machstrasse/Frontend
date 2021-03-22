import {Observable} from 'rxjs';

export interface PageDTO {
  id: string;
  title: string;
}

export interface Page {
  id: string;
  title: string;
  content$: Observable<string>;
}
