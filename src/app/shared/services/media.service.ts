import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Media} from '../../data/media';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../core/config/app-config';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private readonly _url: string;

  constructor(private _http: HttpClient) {
    this._url = AppConfig.INSTANCE.apiEndpoint;
  }

  public getMedia(mediaId: string): Observable<Media> {
    return this._http.get<Media>(`${this._url}/media/${encodeURIComponent(String(mediaId))}`);
  }
}
