import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EventInput} from '@fullcalendar/common';
import {map} from 'rxjs/operators';

interface EventDTO {
  id: string;
  name: string;
  details: string;
  start: Date;
  end: Date;
  owner: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _url = ''; //TODO implement

  constructor(private _http: HttpClient) {}

  private static convertToFCEvent(event: EventDTO): EventInput {
    return {
      id: event.id,
      start: event.start,
      end: event.end,
      title: event.name,
      extendedProps: {
        details: event.details,
        owner: event.owner
      }
    };
  }

  public getEventsBetween(start: Date, end: Date): Observable<EventInput[]> {
    return of([{id: 'test', start: new Date(), end: new Date().setHours(12), title: 'Test', extendedProps: {details: 'lorem ipsum'}}]);
    return this._http.get<EventDTO[]>(this._url.format(start, end)).pipe(map(value => value.map(EventService.convertToFCEvent)));
  }
}
