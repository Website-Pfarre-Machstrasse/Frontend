import {AfterViewInit, Component, EmbeddedViewRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CalendarOptions, EventChangeArg, EventContentArg, FullCalendarComponent} from '@fullcalendar/angular';
import {EventClickArg, EventInput} from '@fullcalendar/common';
import {DateClickArg} from '@fullcalendar/interaction';
import enLocale from '@fullcalendar/core/locales/en-gb';
import deLocale from '@fullcalendar/core/locales/de';
import deATLocale from '@fullcalendar/core/locales/de-at';
import {AuthService} from '../../auth/auth.service';
import {EventService} from '../../shared/services/event.service';
import {Event} from '../../data/event';
import {map} from 'rxjs/operators';

interface EventFetchInfo {
  start: Date;
  end: Date;
  startStr: string;
  endStr: string;
  timeZone: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('fcEventContent') eventContent: TemplateRef<any>;
  @ViewChild('calendar') calendar: FullCalendarComponent;

  options: CalendarOptions = {
    locales: [enLocale, deLocale, deATLocale],
    locale: 'de-at',
    initialView: 'dayGridMonth',
    dateClick: this.onDateClicked.bind(this),
    dayHeaderFormat: {
      weekday: 'long'
    },
    eventClick: this.onEventClicked.bind(this),
    eventChange: this.onEventChanged.bind(this),
    events: this.getEvents.bind(this),
    eventContent: this.onRenderEventContent.bind(this),
    eventWillUnmount: this.onUnrenderEventContent.bind(this),
    editable: false,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek'
    },
    titleFormat: {year: 'numeric', month: 'long', day: 'numeric'}
  };

  private readonly _contentRenderers = new Map<string, EmbeddedViewRef<any>>();

  constructor(private _eventService: EventService, private _authService: AuthService) {}

  private static convertToFCEvent(event: Event): EventInput {
    return {
      id: event.id,
      start: event.start,
      end: event.end,
      title: event.name,
      extendedProps: {
        details: event.details,
        owner: event.owner
      }
    };
  }

  ngAfterViewInit(): void {
    this._authService.user$.subscribe(user => this.calendar?.getApi?.()?.setOption?.('editable', user?.role === 'admin'));
  }

  ngOnInit(): void {
    let themeStyle = document.getElementById('themeStyle') as HTMLLinkElement;
    if (!themeStyle) {
      themeStyle = document.createElement('link');
    }
    themeStyle.href = 'calendar.css';
    themeStyle.rel = 'stylesheet';
    themeStyle.id = 'themeStyle';
    document.head.appendChild(themeStyle);
  }

  ngOnDestroy(): void {
    document.getElementById('themeStyle')?.remove();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private onRenderEventContent(arg: EventContentArg): any {
    let renderer = this._contentRenderers.get(arg.event.id);
    if (!renderer) {
      renderer = this.eventContent.createEmbeddedView({ arg });
      this._contentRenderers.set(arg.event.id, renderer);
    } else {
      renderer.context.arg = arg;
      renderer.markForCheck();
    }
    renderer.detectChanges();
    return { domNodes: renderer.rootNodes };
  }

  private onUnrenderEventContent(arg: EventContentArg): void {
    this._contentRenderers.get(arg.event.id)?.destroy?.();
  }

  private onEventChanged(arg: EventChangeArg): void {
    // TODO implement
  }

  private onEventClicked(arg: EventClickArg): void {
    const event = arg.event;
    // TODO open event details dialog
  }

  private onDateClicked(arg: DateClickArg): void {
    this._authService.user$.subscribe(user => {
      if (user) {
        const {date, allDay} = arg;
        // TODO open create event dialog
      }
    });
  }

  private getEvents(
    {end, start}: EventFetchInfo,
    successCallback: (events: EventInput[]) => void,
    failureCallback: (error: unknown) => void
  ): void {
    this._eventService.getEvents(start, end)
      .pipe(map(value => value.map(CalendarComponent.convertToFCEvent)))
      .toPromise()
      .then(successCallback)
      .catch(failureCallback);
  }
}
