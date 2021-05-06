import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthModule} from '../../auth/auth.module';

describe('EventService', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule, AuthModule]});
    service = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
