import './object.d';
import { transform, isEqual, isObject, cloneDeep } from 'lodash';
import { isObservable } from 'rxjs';

/**
 * Deep diff between two object, using lodash
 *
 * @param   object Object compared
 * @param   base   Object to compare with
 * @return         a new object who represent the diff
 */
const difference = <T=unknown,U=unknown>(object: T, base: U): Partial<T & U> => transform(object, (result, value, key) => {
  if (!isEqual(value, base[key]) && !(isObservable(value) || isObservable(base[key]))) {
    result[key] = isObject(value) && isObject(base[key]) ? difference(value, base[key]) : value;
  }
});

const deepCopy = <T>(obj: T): T => {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || 'object' != typeof obj) {
    return obj;
  }

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (const attr in obj) {
      // eslint-disable-next-line no-prototype-builtins
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
