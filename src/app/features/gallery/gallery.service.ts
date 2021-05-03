import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../core/config/app-config';
import {Gallery} from '../../data/gallery';

const TEST = {
  id: 'test',
  title: 'Test',
  media: [
    {
      _links: {
        file: 'assets/img01.jpg',
        thumbnail: 'assets/img01.jpg'
      },
      id: 'test1',
      name: 'Test',
      mimetype: 'image/jpg',
      owner: ''
    },
    {
      _links: {
        file: 'assets/img02.jpg',
        thumbnail: 'assets/img02.jpg'
      },
      id: 'test2',
      name: 'Test',
      mimetype: 'image/jpg',
      owner: ''
    },
    {
      _links: {
        file: 'assets/img03.jpg',
        thumbnail: 'assets/img03.jpg'
      },
      id: 'test3',
      name: 'Test',
      mimetype: 'image/jpg',
      owner: ''
    },
    {
      _links: {
        file: 'assets/img04.jpg',
        thumbnail: 'assets/img04.jpg'
      },
      id: 'test4',
      name: 'Test',
      mimetype: 'image/jpg',
      owner: ''
    },
    {
      _links: {
        file: 'assets/img05.jpg',
        thumbnail: 'assets/img05.jpg'
      },
      id: 'test5',
      name: 'Test',
      mimetype: 'image/jpg',
      owner: ''
    },
    {
      _links: {
        file: 'assets/img06.jpg',
        thumbnail: 'assets/img06.jpg'
      },
      id: 'test6',
      name: 'Test',
      mimetype: 'image/jpg',
      owner: ''
    }
  ],
  owner: ''
};

const TEST2 = {
  id: 'test2',
  title: 'Test2',
  media: [
    {
      _links: {
        file: 'assets/img03.jpg',
        thumbnail: 'assets/img03.jpg'
      },
      id: 'test3',
      name: 'Test',
      mimetype: 'image/jpg',
      owner: ''
    },
    {
      _links: {
        file: 'assets/img04.jpg',
        thumbnail: 'assets/img04.jpg'
      },
      id: 'test4',
      name: 'Test',
      mimetype: 'image/jpg',
      owner: ''
    },
    {
      _links: {
        file: 'assets/img05.jpg',
        thumbnail: 'assets/img05.jpg'
      },
      id: 'test5',
      name: 'Test',
      mimetype: 'image/jpg',
      owner: ''
    },
    {
      _links: {
        file: 'assets/videos/stock_video_1080p.mp4',
        thumbnail: 'assets/placeholder.png'
      },
      id: 'test7',
      name: 'Test',
      mimetype: 'video/mp4',
      owner: ''
    }
  ],
  owner: ''
};


const TEST3 = {
  id: 'test3',
  title: 'Test3',
  media: [
    {
      _links: {
        file: 'assets/img01.jpg',
        thumbnail: 'assets/img01.jpg'
      },
      id: 'test1',
      name: 'Test',
      mimetype: 'image/jpg',
      owner: ''
    },
    {
      _links: {
        file: 'assets/img02.jpg',
        thumbnail: 'assets/img02.jpg'
      },
      id: 'test2',
      name: 'Test',
      mimetype: 'image/jpg',
      owner: ''
    },
    {
      _links: {
        file: 'assets/img03.jpg',
        thumbnail: 'assets/img03.jpg'
      },
      id: 'test3',
      name: 'Test',
      mimetype: 'image/jpg',
      owner: ''
    }
  ],
  owner: ''
};


const TEST4 = {
  id: 'test4',
  title: 'Test4',
  media: [
    {
      _links: {
        file: 'assets/img01.jpg',
        thumbnail: 'assets/img01.jpg'
      },
      id: 'test1',
      name: 'Test',
      mimetype: 'image/jpg',
      owner: ''
    },
    {
      _links: {
        file: 'assets/img02.jpg',
        thumbnail: 'assets/img02.jpg'
      },
      id: 'test2',
      name: 'Test',
      mimetype: 'image/jpg',
      owner: ''
    },
  ],
  owner: ''
};

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
}
