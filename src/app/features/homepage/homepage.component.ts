import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {EventService} from '../../shared/services/event.service';
import {Event} from '../../data/event';
import {ContentService} from '../../shared/services/content.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  text$: Observable<string>;
  events$: Observable<Event[]>;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _eventService: EventService,
              private _auth: AuthService,
              contentService: ContentService) {
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

  public getName(ownerId: string): string {
    return ownerId; //TODO implement
  }

  public canEdit(): Observable<boolean> {
    return this._auth.isAuthenticated();
  }

  public edit(): void {
    this._router.navigate(['editor'], {queryParams: {cat: '_', page: 'home'}});
  }
}
