import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Media } from 'src/app/data/media';
import { MediaService } from '../../../shared/services/media.service';
import { AppConfig } from '../../../core/config/app-config';

@Component({
  selector: 'app-media-browser',
  templateUrl: './media-browser.component.html',
  styleUrls: ['./media-browser.component.scss']
})
export class MediaBrowserComponent {
  selected: Media[] = [];
  title: string;

  get media$(): Observable<Media[]> {
    if (this._data?.data?.filter) {
      return this._mediaService.getMediaFiltered(this._data.data.filter);
    }
    return this._mediaService.getMedia();
  }

  constructor(@Inject(MAT_DIALOG_DATA) private _data: { data: { filter?: string; title: string } },
              private _mediaService: MediaService) {
    this.title = _data.data.title;
  }

  fixURL(file: string): string {
    return file.replace('/api', AppConfig.INSTANCE.apiEndpoint);
  }
}
