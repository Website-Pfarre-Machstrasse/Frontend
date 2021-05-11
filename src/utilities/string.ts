/* eslint-disable @typescript-eslint/no-explicit-any */
import './string.d';

const regexNumber = /{(\d+(:\w*)?)}/g;
const regexObject = /{((?:[\w.()])+(:\w*)?)}/g;

const getDisplayDateFromString = (input: string): string => {
  const splitted: string[] = input.split('-');

  if (splitted.length <= 1) {
    return input;
  }

  let day = splitted[splitted.length - 1];
  const month = splitted[splitted.length - 2];
  const year = splitted[splitted.length - 3];
  day = day.split('T')[0];
  day = day.split(' ')[0];

  return `${day}.${month}.${year}`;
};

const getSortableDateFromString = (input: string): string => {
  const splitted = input.replace(',', String.Empty).split('.');
  if (splitted.length <= 1) {
    return input;
  }

  const times = splitted[splitted.length - 1].split(' ');
  let time = String.Empty;
  if (times.length > 1) {
    time = times[times.length - 1];
  }

  const year = splitted[splitted.length - 1].split(' ')[0];
  const month = splitted[splitted.length - 2];
  const day = splitted[splitted.length - 3];
  let result = `${year}-${month}-${day}`;

  if (!(time == null || String.isWhitespaceOrEmpty(time)) && time.length > 1) {
    result += `T${time}`;
  }
  else {
    result += 'T00:00:00';
  }

  return result;
};

const formatNumber = (input: number, formatTemplate: string): string => {
  const count = formatTemplate.length;
  const stringValue = input.toString();
  if (count <= stringValue.length) {
    return stringValue;
  }

  let remainingCount = count - stringValue.length;
  remainingCount += 1; //Array must have an extra entry

  return new Array(remainingCount).join('0') + stringValue;
};

const decimalToHexString = (value: string, upperCase: boolean = false) => {
  const parsed = parseFloat(value as string);
  const hexNumber = parsed.toString(16);
  return upperCase ? hexNumber.toLocaleUpperCase() : hexNumber;
};

type PatternFormat = 'L' | 'U' | 'd' | 's' | 'n' | 'x' | 'X' | string;

const parsePattern = (match: PatternFormat, arg: string | Date | number | any): string => {
  switch (match) {
    case 'L': {
      arg = arg.toLocaleLowerCase();
      return arg;
    }
    case 'U': {
      arg = arg.toLocaleUpperCase();
      return arg;
    }
    case 'd': {
      if (typeof (arg) === 'string') {
        return getDisplayDateFromString(arg);
      }
      else if (arg instanceof Date) {
        return String.format('{0:00}.{1:00}.{2:0000}', arg.getDate(), arg.getMonth(), arg.getFullYear());
      }
      break;
    }
    case 's': {
      if (typeof (arg) === 'string') {
        return getSortableDateFromString(arg);
      }
      else if (arg instanceof Date) {
        return String.format('{0:0000}-{1:00}-{2:00}', arg.getFullYear(), arg.getMonth(), arg.getDate());
      }
      break;
    }
    case 'n': {//Tausender Trennzeichen
      if (typeof (arg) !== 'string')
        {arg = arg.toString();}
      const replacedString = arg.replace(/,/g, '.');
      if (isNaN(parseFloat(replacedString)) || replacedString.length <= 3) {
        break;
      }

      const numberParts: string[] = replacedString.split(/[^0-9]+/g);
      let parts = numberParts;

      if (numberParts.length > 1) {
        parts = [numberParts.splice(0, numberParts.length - 1).join(String.Empty), numberParts[numberParts.length - 1]];
      }

      const integer = parts[0];

      const mod = integer.length % 3;
      let output = (mod > 0 ? (integer.substring(0, mod)) : String.Empty);
      const remainingGroups = integer.substring(mod).match(/.{3}/g);
      output = output + '.' + remainingGroups.join('.');
      arg = output + (parts.length > 1 ? ',' + parts[1] : String.Empty);
      return arg;
    }
    case 'x': {
      return decimalToHexString(arg);
    }
    case 'X': {
      return decimalToHexString(arg, true);
    }
    default: {
      break;
    }
  }

  if ((typeof (arg) === 'number' || !isNaN(arg)) && !isNaN(+match) && !(arg == null || String.isWhitespaceOrEmpty(arg))) {
    return formatNumber(arg, match);
  }

  return arg;
};

if (String.Empty === undefined) {
  String.Empty = '';
}

if (!String.isWhitespaceOrEmpty) {
  String.isWhitespaceOrEmpty = (s: string) => {
    s = s.toString();
    return s.replace(/\s/g, String.Empty).length <= 0;
  };
}

if (!String.format) {
  String.format = (format: string, ...replacements: any[]) => {
    try {
      if (format.match(regexNumber)) {
        return format.replace(regexNumber, (match, x) => { //0
          const s = match.split(':');
          if (s.length > 1) {
            x = s[0].replace('{', String.Empty);
            match = s[1].replace('}', String.Empty); //U
          }

          let arg = replacements[x];

          if (arg == null || match.match(/{\d+}/)) {
            return arg;
          }

          arg = parsePattern(match, arg);
          return typeof arg != 'undefined' && arg != null ? arg : String.Empty;
        });
      }

      if (format.match(regexObject)) {
        return format.replace(regexObject, (match, x: string) => { //0
          const s = match.split(':');
          if (s.length > 1) {
            x = s[0].replace('{', String.Empty);
            match = s[1].replace('}', String.Empty); //U
          }

          const parts = x.split('.');
          let arg = replacements[0];
          for (let part of parts) {
            if (part.includes('(')) {
              part = part.replace(/[()]/g, String.Empty);
              arg = arg?.[part]?.();
            } else {
              arg = arg?.[part];
            }
          }
          if (arg == null || match.match(/{\d+}/)) {
            return arg;
          }

          arg = parsePattern(match, arg);
          return typeof arg != 'undefined' && arg != null ? arg : String.Empty;
        });
      }

      return format;
    } catch (e) {
      console.error(e);
      return String.Empty;
    }
  };
}

if (!String.prototype.isWhitespaceOrEmpty) {
  function isWhitespaceOrEmpty() {
    return String.isWhitespaceOrEmpty(this);
  }

  String.prototype.isWhitespaceOrEmpty = isWhitespaceOrEmpty;
}

if (!String.prototype.format) {
  function format(...replacements: any[]) {
    return String.format(this, ...replacements);
  }

  String.prototype.format = format;
}
