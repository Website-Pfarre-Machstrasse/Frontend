import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Event, EventDTO} from '../../data/event';
import {MediaService} from './media.service';
import {AppConfig} from '../../core/config/app-config';
import {map} from 'rxjs/operators';
import {Media} from '../../data/media';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _url: string;

  constructor(private _http: HttpClient, private _media: MediaService) {
    this._url = AppConfig.INSTANCE.apiEndpoint;
  }

  public getEvents(start?: Date, endOrN?: Date | number): Observable<Event[]> {
    let opts: { params: HttpParams; observe: 'body' };
    if ((start === null || start === undefined) && (endOrN === null || endOrN === undefined)) {
      opts = undefined;
    } else {
      const params = new HttpParams();
      if (start !== null && start !== undefined) {
        params.set('start', start.toISOString());
        if (endOrN !== null && endOrN !== undefined) {
          if (endOrN instanceof Date) {
            params.set('end', endOrN.toISOString());
          } else {
            params.set('next', endOrN.toString());
          }
        }
      } else if (endOrN !== null && endOrN !== undefined && !(endOrN instanceof Date)) {
        params.set('next', endOrN.toString());
      }
      opts = {params, observe: 'body'};
    }
    return this._http.get<EventDTO[]>(`${this._url}/event`, opts).pipe(map(value => value.map(value1 => {
      const ref = this;
      return {
        ...value1,
        get media$(): Observable<Media> {
          if (this.media) {
            return ref._media.getMedia(this.media);
          } else {
            return of(null);
          }
        }
      } as Event;
    })));
  }
}