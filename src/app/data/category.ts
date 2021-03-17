import {Observable} from 'rxjs';
import {Page} from './page';

export interface CategoryDTO {
  id: string;
  title: string;
}

export interface Category {
  id: string;
  title: string;
  pages$?: Observable<Page[]>;
}
