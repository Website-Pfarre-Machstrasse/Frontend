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

export const isFullDay = (event: Event): boolean => false;
export const isSameDay = (event: Event): boolean => event.start.getDate() === event.end.getDate() &&
    event.start.getMonth() === event.end.getMonth() &&
    event.start.getFullYear() === event.end.getFullYear();
