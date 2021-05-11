import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Media} from '../../data/media';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../core/config/app-config';
import { UploadResult } from '../../data/upload-result';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private readonly _url: string;

  constructor(private _http: HttpClient) {
    this._url = AppConfig.INSTANCE.apiEndpoint;
  }

  public getMediaFiltered(filter: string): Observable<Media[]> {
    return this._http.get<Media[]>(`${this._url}/media?type=${encodeURIComponent(filter)}`);
  }

  public getMedia(): Observable<Media[]> {
    return this._http.get<Media[]>(`${this._url}/media`);
  }

  public getSingleMedia(mediaId: string): Observable<Media> {
    return this._http.get<Media>(`${this._url}/media/${mediaId}`);
  }

  public uploadFile(file: File): Observable<UploadResult> {
    const data = new FormData();
    data.append('file', file, file.name);
    return this._http.post<Media>(`${this._url}/media`, data).pipe(map(media => ({
      name: media.name,
      url: media._links.file,
      media: media.mimetype.startsWith('image') ||
        media.mimetype.startsWith('video') ||
        media.mimetype.startsWith('audio')
    })));
  }
}
