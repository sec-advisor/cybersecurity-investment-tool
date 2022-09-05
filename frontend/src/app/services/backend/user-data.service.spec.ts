/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { UserDataService } from './user-data.service';


describe('Service: UserData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserDataService]
    });
  });

  it('should ...', inject([UserDataService], (service: UserDataService) => {
    expect(service).toBeTruthy();
  }));
});
