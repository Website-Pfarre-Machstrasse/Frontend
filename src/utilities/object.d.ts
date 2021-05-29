declare abstract class ObjectConstructor {
  clone<T>(obj: T): T;
  diff<T,U>(object: T, base: U): Partial<T & U>;
}
