import { TestBed, inject } from '@angular/core/testing';

import { WebstorageService } from './webstorage.service';

describe('WebstorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebstorageService]
    });
  });

  it('should be created', inject([WebstorageService], (service: WebstorageService) => {
    expect(service).toBeTruthy();
  }));
});
