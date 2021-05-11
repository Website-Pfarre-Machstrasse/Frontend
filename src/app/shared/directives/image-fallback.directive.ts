import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'img[fallback]'
})
export class ImageFallbackDirective {
  @Input() @HostBinding('src') src: string;
  @Input() fallback: string;
  @HostBinding('class.fallback') isFallback: boolean;
  @HostListener('error')
  updateUrl(): void {
    this.src = this.fallback;
    this.isFallback = true;
  }
}
