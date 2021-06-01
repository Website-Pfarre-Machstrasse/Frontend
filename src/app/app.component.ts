import {Component, HostBinding} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @HostBinding('class') class = 'mat-typography';
  title = 'Pfarre Machstrasse - Hl. Klaus von Flüe';

  public print(): void {
    window.print();
  }
}
