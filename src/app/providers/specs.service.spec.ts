import { TestBed, inject } from '@angular/core/testing';

import { SpecsService } from './specs.service';

describe('SpecsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecsService]
    });
  });

  it('should be created', inject([SpecsService], (service: SpecsService) => {
    expect(service).toBeTruthy();
  }));
});
