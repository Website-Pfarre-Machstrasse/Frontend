/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/naming-convention, id-blacklist */
declare interface String {
  format(...replacements: any[]): string;
  isWhitespaceOrEmpty(): boolean;
}
declare abstract class StringConstructor {
  Empty: string;
  format(format: string, ...replacements: any[]): string;
  isWhitespaceOrEmpty(s: string): boolean;
}
