import {Observable} from 'rxjs';

/**
 * The DTO (DataTransferObject) for a page
 */
export interface PageDTO {
  /**
   * The id of this page
   */
  id: string;
  /**
   * The title of this page
   */
  title: string;
  /**
   * The category this page belongs to
   */
  category: string;
  /**
   * The position of the page insede the category
   */
  order: number;
}

/**
 * The full page object
 */
export interface Page extends PageDTO {
  /**
   * The direct accessor for the content of this page
   */
  content$: Observable<string>;
}
