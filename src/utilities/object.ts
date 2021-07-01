/* eslint-disable @typescript-eslint/no-explicit-any,no-prototype-builtins */
import './object.d';

/**
 * Deep diff between two object, using lodash
 *
 * @param   base   Object to compare with
 * @param   object Object compared
 * @return         a new object who represent the diff
 */
const difference = <T=unknown,U=unknown>(base: T, object: U): Partial<T & U> => {
  if (!object || Object.prototype.toString.call(object) !== '[object Object]') {
    return base;
  }

  const diffs = {};

  const arraysMatch = (arr1: any[], arr2: any[]): boolean => {

    if (arr1.length !== arr2.length) {return false;}

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {return false;}
    }

    return true;

  };

  const compare = (item1: any, item2: any, k: string) => {

    const type1 = Object.prototype.toString.call(item1);
    const type2 = Object.prototype.toString.call(item2);

    if (type2 === '[object Undefined]') {
      diffs[k] = null;
      return;
    }

    if (type1 !== type2) {
      diffs[k] = item2;
      return;
    }

    if (type1 === '[object Object]') {
      const objDiff = difference(item1, item2);
      if (Object.keys(objDiff).length > 0) {
        diffs[k] = objDiff;
      }
      return;
    }

    if (type1 === '[object Array]') {
      if (!arraysMatch(item1, item2)) {
        diffs[k] = item2;
      }
      return;
    }

    if (type1 === '[object Function]') {
      if (item1.toString() !== item2.toString()) {
        diffs[k] = item2;
      }
    } else {
      if (item1 !== item2 ) {
        diffs[k] = item2;
      }
    }

  };

  let key;
  for (key in base) {
    if (base.hasOwnProperty(key)) {
      compare(base[key], object[key], key);
    }
  }

  for (key in object) {
    if (object.hasOwnProperty(key)) {
      if (!base[key] && base[key] !== object[key] ) {
        diffs[key] = object[key];
      }
    }
  }

  return diffs;
};

const deepCopy = <T>(obj: T): T => {
  let copy;

  if (null == obj || 'object' != typeof obj) {
    return obj;
  }

  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  if (obj instanceof Object) {
    copy = {};
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        if (String(obj[attr]) === '() => Object.clone(undefined)') {
          console.log(obj);
        }
        copy[attr] = deepCopy(obj[attr]);
      }
    }
    return copy;
  }

  throw new Error('Unable to copy obj! Its type isn\'t supported.');
};

if (!Object.diff) {
  Object.diff = difference;
}

if (!Object.clone) {
  Object.clone = deepCopy;
}
