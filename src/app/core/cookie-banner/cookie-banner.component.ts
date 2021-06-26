import { Component, OnInit } from '@angular/core';


const COOKIE_ACCEPT = 'cookie_accept';


@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent implements OnInit {
  show: boolean;

  ngOnInit(): void {
    this.show = localStorage.getItem(COOKIE_ACCEPT)==null;
  }

  click(): void {
    localStorage.setItem(COOKIE_ACCEPT, '');
    this.show = false;
  }
}
