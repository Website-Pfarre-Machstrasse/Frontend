import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {EventService} from '../../shared/services/event.service';
import {Event} from '../../data/event';
import {ContentService} from '../../shared/services/content.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  text$: Observable<string>;

  get events$(): Observable<Event[]> {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate()+8);
    return this._eventService.getEvents(start, end);
  }

  constructor(private _eventService: EventService, contentService: ContentService) {
    this.text$ = contentService.getHomeContent();
  }

  ngOnDestroy(): void {
    document.getElementById('themeStyle')?.remove();
  }

  ngOnInit(): void {
    let themeStyle = document.getElementById('themeStyle') as HTMLLinkElement;
    if (!themeStyle) {
      themeStyle = document.createElement('link');
    }
    themeStyle.href = 'homepage.css';
    themeStyle.rel = 'stylesheet';
    themeStyle.id = 'themeStyle';
    document.head.appendChild(themeStyle);
  }

  public getName(ownerId: string): string {
    return ownerId; //TODO implement
  }
}
