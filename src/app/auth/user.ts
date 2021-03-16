export type Role = 'admin' | 'author';
export interface User {
  username: string;
  role: Role;
}
