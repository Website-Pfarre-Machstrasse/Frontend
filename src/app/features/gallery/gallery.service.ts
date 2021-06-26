import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../core/config/app-config';
import {Gallery} from '../../data/gallery';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private readonly _url: string;
  constructor(private _http: HttpClient) {
    this._url = AppConfig.INSTANCE.apiEndpoint;
  }

  public addMediaToGallery(galleryId: string, mediaId: string): Observable<Gallery> {
    if (galleryId === null || galleryId === undefined) {
      throw new Error('Required parameter galleryId was null or undefined when calling addMediaToGallery.');
    }
    if (mediaId === null || mediaId === undefined) {
      throw new Error('Required parameter mediaId was null or undefined when calling addMediaToGallery.');
    }

    return this._http.post<Gallery>(`${this._url}/galleries/${encodeURIComponent(String(galleryId))}`, {mediaId});
  }

  public getGallery(id: string): Observable<Gallery> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getGallery.');
    }
    return this._http.get<Gallery>(`${this._url}/gallery/${encodeURIComponent(String(id))}`);
  }

  public getGalleries(): Observable<Gallery[]> {
    return this._http.get<Gallery[]>(`${this._url}/gallery`);
  }

  public createGallery(title: string): Observable<Gallery> {
    return this._http.post<Gallery>(`${this._url}/gallery`, {title});
  }

  public setGalleryName(id: string, title: string): Observable<Gallery> {
    return this._http.patch<Gallery>(`${this._url}/gallery/${encodeURIComponent(String(id))}`, {title});
  }

  public deleteGallery(id: string): Observable<void> {
    return this._http.delete(`${this._url}/gallery/${encodeURIComponent(String(id))}`).pipe(map(() => undefined));
  }
}
