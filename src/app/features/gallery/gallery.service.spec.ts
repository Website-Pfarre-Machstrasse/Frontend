import { TestBed } from '@angular/core/testing';

import { GalleryService } from './gallery.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GalleryService', () => {
  let service: GalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
