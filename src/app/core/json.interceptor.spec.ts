import { TestBed } from '@angular/core/testing';

import { JsonInterceptor } from './json.interceptor';

describe('JsonInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JsonInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JsonInterceptor = TestBed.inject(JsonInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
