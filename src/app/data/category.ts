import {Observable} from 'rxjs';
import {Page} from './page';

/**
 * The DTO (DataTransferObject) for a category
 */
export interface CategoryDTO {
  /**
   * The id of this category
   */
  id: string;
  /**
   * The title of this category
   */
  title: string;
  /**
   * The ordering number of this category
   */
  order: number;
}

/**
 * The full category object
 */
export interface Category extends CategoryDTO {
  /**
   * The direct accessor for all pages of this category<br>
   * Executes a http request to fetch the pages
   *
   * @see Page
   */
  pages$?: Observable<Page[]>;
}
