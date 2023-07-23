/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnalyseCompaniesModalService } from './analyse-companies-modal.service';

describe('Service: AnalyseCompaniesModal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalyseCompaniesModalService],
    });
  });

  it('should ...', inject(
    [AnalyseCompaniesModalService],
    (service: AnalyseCompaniesModalService) => {
      expect(service).toBeTruthy();
    },
  ));
});
