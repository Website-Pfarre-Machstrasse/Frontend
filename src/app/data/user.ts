export type Role = 'admin' | 'author';

/**
 * The object representing a user
 */
export interface User {
  /**
   * The UUID of the user
   */
  id: string;
  /**
   * The users email
   */
  email: string;
  /**
   * The users first name
   */
  firstName: string;
  /**
   * The users last name
   */
  lastName: string;
  /**
   * The users role
   */
  role: Role;
}
