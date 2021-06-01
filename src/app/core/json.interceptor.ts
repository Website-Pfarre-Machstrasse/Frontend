import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

const isArray = Array.isArray;

const isObject = (o) => o === Object(o) && !isArray(o) && typeof o !== 'function';

const toCamel = (s) => s.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
  .replace('-', '')
  .replace('_', ''));

const keysToCamel = (o) => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o)
      .forEach((k) => {
        const preserve = k.startsWith('_');
        let key: string = toCamel(k);
        if (preserve) {
          key = '_'+key.charAt(0).toLowerCase()+key.slice(1);
        }
        n[key] = keysToCamel(o[k]);
      });

    return n;
  } else if (isArray(o)) {
    return o.map((i) => keysToCamel(i));
  }

  return o;
};

/**
 * Intercept json responses and convert them to camelCase
 */
@Injectable()
export class JsonInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.responseType === 'json') {
      return next.handle(request).pipe(map(value => {
        if (value instanceof HttpResponse) {
          try {
            return value.clone({body: keysToCamel(value.body)});
          } catch (ignored) {
          }
        }
        return value;
      }));
    } else {
      return next.handle(request);
    }
  }
}
