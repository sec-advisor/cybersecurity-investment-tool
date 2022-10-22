/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { EquationDataService } from './equation-data.service';

describe('Service: EquationData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [EquationDataService],
    });
  });

  it('should ...', inject(
    [EquationDataService],
    (service: EquationDataService) => {
      expect(service).toBeTruthy();
    },
  ));
});
