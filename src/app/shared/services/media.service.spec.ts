import { TestBed } from '@angular/core/testing';

import { MediaService } from './media.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MediaService', () => {
  let service: MediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
