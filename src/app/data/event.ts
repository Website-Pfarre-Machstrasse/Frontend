export interface Event {
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
