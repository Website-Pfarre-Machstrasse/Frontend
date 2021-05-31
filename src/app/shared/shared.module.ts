import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxSubscribeDirective } from './directives/rx-subscribe.directive';
import { ContentService } from './services/content.service';
import { RendererComponent } from './components/renderer/renderer.component';
import { ShowdownModule } from 'ngx-showdown';
import { MediaService } from './services/media.service';
import { ImageFallbackDirective } from './directives/image-fallback.directive';
import { MediaBrowserComponent } from './components/media-browser/media-browser.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RxSubscribeDirective, RendererComponent, MediaBrowserComponent, ImageFallbackDirective],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ShowdownModule,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: [RxSubscribeDirective, RendererComponent, MediaBrowserComponent, ImageFallbackDirective],
  providers: [
    ContentService,
    MediaService
  ],
  entryComponents: [MediaBrowserComponent]
})
export class SharedModule {
}
