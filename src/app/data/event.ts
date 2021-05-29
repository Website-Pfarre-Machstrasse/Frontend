import {Observable} from 'rxjs';
import {Media} from './media';

export interface EventDTO {
  id: string;
  name: string;
  details: string;
  start: Date;
  end: Date;
  media: string | null;
  owner: string;
}

export interface Event extends EventDTO {
  media$: Observable<Media>;
}
