/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnalyseCompaniesViewService } from './analyse-companies-view.service';

describe('Service: AnalyseCompaniesView', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalyseCompaniesViewService]
    });
  });

  it('should ...', inject([AnalyseCompaniesViewService], (service: AnalyseCompaniesViewService) => {
    expect(service).toBeTruthy();
  }));
});
