import { TestBed } from '@angular/core/testing';

import { DbaseService } from './dbase.service';

describe('DbaseService', () => {
  let service: DbaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
