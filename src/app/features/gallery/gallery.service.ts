import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

export interface Media {
  _links: {
    file: string;
    thumbnail: string;
  };
  id: string;
  name: string;
  mimetype: string;
  owner: string;
}

export interface Gallery {
  id: string;
  title: string;
  owner: string;
  media: Media[];
}

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

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  public getGallery(id: string): Observable<Gallery> {
    return of(TEST);
  }

  public getGalleries(): Observable<Gallery[]> {
    return of([TEST]);
  }
}
