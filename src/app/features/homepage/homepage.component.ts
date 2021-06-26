import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {EventService} from '../../shared/services/event.service';
import { Event, isFullDay, isSameDay } from '../../data/event';
import {ContentService} from '../../shared/services/content.service';
import { UserService } from '../../shared/services/user.service';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  text$: Observable<string>;
  events$: Observable<Event[]>;

  constructor(private _eventService: EventService, private _userService: UserService, contentService: ContentService) {
    this.text$ = contentService.getPageContent('_', 'home');
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate()+8);
    this.events$ = this._eventService.getEvents(start, end);
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

  public getName(ownerId: string): Observable<string> {
    return this._userService.getUser(ownerId).pipe(map(value => `${value.firstName} ${value.lastName}`));
  }

  public formatEventDate(event: Event): string {
    if (isFullDay(event)) {
      return formatDate(event.start, 'E d.M.y', 'de-AT');
    }
    const start = formatDate(event.start, 'E d.M.y h:m', 'de-AT');
    const end = formatDate(event.end, isSameDay(event)?'h:m':'E d.M.y h:m', 'de-AT');
    return start + ' — ' + end;
  }
}
