import { TestBed, inject } from '@angular/core/testing';

import { OptionSetsService } from './option-sets.service';

describe('OptionSetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OptionSetsService]
    });
  });

  it('should be created', inject([OptionSetsService], (service: OptionSetsService) => {
    expect(service).toBeTruthy();
  }));
});
