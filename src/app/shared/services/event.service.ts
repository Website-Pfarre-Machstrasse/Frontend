import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Event} from '../../data/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _url = ''; //TODO implement

  constructor(private _http: HttpClient) {}

  public getEventsBetween(start: Date, end: Date): Observable<Event[]> {
    return of([{id: 'test', start: new Date(), end: new Date(new Date().setHours(12)), name: 'Test', details: 'lorem ipsum', owner: ''}]);
    return this._http.get<Event[]>(this._url.format(start, end));
  }
}
