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

  public getGallery(id: string): Observable<Gallery> {
    switch(id) {
      case TEST.id:
        return of(TEST);
      case TEST2.id:
        return of(TEST2);
      case TEST3.id:
        return of(TEST3);
      case TEST4.id:
        return of(TEST4);
    }
  }

  public getGalleries(): Observable<Gallery[]> {
    return of([TEST, TEST2, TEST3, TEST4]);
  }
}
