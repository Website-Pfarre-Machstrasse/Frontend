import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowdownModule } from 'ngx-showdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ImageFallbackDirective } from './directives/image-fallback.directive';
import { RxSubscribeDirective } from './directives/rx-subscribe.directive';
import { MediaBrowserComponent } from './components/media-browser/media-browser.component';
import { RendererComponent } from './components/renderer/renderer.component';
import { ContentService } from './services/content.service';
import { MediaService } from './services/media.service';
import { EventService } from './services/event.service';
import { UserService } from './services/user.service';

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
    EventService,
    MediaService,
    UserService
  ],
  entryComponents: [MediaBrowserComponent]
})
export class SharedModule { }
