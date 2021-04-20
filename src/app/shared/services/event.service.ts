import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Event, EventDTO} from '../../data/event';
import {map} from 'rxjs/operators';
import {Media} from '../../data/media';
import {MediaService} from './media.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _url = ''; //TODO implement

  constructor(private _http: HttpClient, private _media: MediaService) {}

  public getEventsBetween(start: Date, end: Date): Observable<Event[]> {
    return of([
      {
        id: 'test',
        name: 'Test',
        details: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est laboriosam necessitatibus perferendis possimus
          vero? Accusantium architecto assumenda atque aut commodi cumque cupiditate dignissimos dolores, ducimus eos
          esse excepturi inventore laboriosam maxime modi natus nihil nulla odit officia, perferendis possimus, quae
          quibusdam quisquam quos sit totam ut vel velit vero voluptatibus? Ab, ad delectus, eius eos ex inventore
          itaque, iusto labore magni nihil odio officiis quas quibusdam reprehenderit velit voluptatem voluptatibus!`,
        start: new Date(new Date().setHours(10)),
        end: new Date(new Date().setHours(12)),
        owner: '',
        media: null,
        media$: of(null)
      },
      {
        id: 'test2',
        name: 'Test2',
        details: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est laboriosam necessitatibus perferendis possimus
          vero? Accusantium architecto assumenda atque aut commodi cumque cupiditate dignissimos dolores, ducimus eos
          esse excepturi inventore laboriosam maxime modi natus nihil nulla odit officia, perferendis possimus, quae
          quibusdam quisquam quos sit totam ut vel velit vero voluptatibus? Ab, ad delectus, eius eos ex inventore
          itaque, iusto labore magni nihil odio officiis quas quibusdam reprehenderit velit voluptatem voluptatibus!`,
        start: new Date(new Date().setHours(10)),
        end: new Date(new Date().setHours(12)),
        owner: '',
        media: null,
        media$: of(null)
      }
    ]);
    return this._http.get<EventDTO[]>(this._url.format(start, end)).pipe(map(value => value.map(value1 => {
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
