export type ChangeType = 1 | 0 | -1;
export type ChangeData = ([ChangeType, string])[];

export interface Change {
  /**
   * The UUID of the User creating this change
   *
   * @type string uuid
   */
  author: string;
  /**
   * The id of the category which the page of this change belongs to
   *
   * @see Category.id
   * @see Page.category
   */
  category: string;
  /**
   * The id of the page this change was made on
   *
   * @see Page.id
   */
  page: string;
  /**
   * The timestamp of creation of this change
   */
  createdAt: Date;
  /**
   * The data of this change
   */
  data: ChangeData;
}
