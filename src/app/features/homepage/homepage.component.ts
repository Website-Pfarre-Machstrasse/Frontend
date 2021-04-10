import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';

import {EventService} from '../../shared/services/event.service';
import {Event} from '../../data/event';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {

  get events$(): Observable<Event[]> {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate()+8);
    return this._eventService.getEventsBetween(start, end);
  }

  constructor(private _eventService: EventService) {
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
