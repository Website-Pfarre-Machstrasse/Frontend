import {Observable} from 'rxjs';
import {Media} from './media';

export interface EventDTO {
  id: string;
  name: string;
  details: string;
  start: Date;
  end: Date;
  owner: string;
}

export interface Event extends EventDTO {
  media$: Observable<Media>;
}
