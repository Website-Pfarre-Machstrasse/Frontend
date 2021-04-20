import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Media} from '../../data/media';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private _url = ''; //TODO implement

  constructor(private _http: HttpClient) {}

  public getMedia(mediaId: string): Observable<Media> {
    return this._http.get<Media>(this._url.format(mediaId));
  }
}
