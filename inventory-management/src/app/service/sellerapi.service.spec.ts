import { TestBed } from '@angular/core/testing';

import { SellerApiService } from './sellerapi.service';

describe('ApiService', () => {
  let service: SellerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
