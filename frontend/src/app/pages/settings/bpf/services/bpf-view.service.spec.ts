/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { BpfViewService } from './bpf-view.service';

describe('Service: BpfView', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BpfViewService],
    });
  });

  it('should ...', inject([BpfViewService], (service: BpfViewService) => {
    expect(service).toBeTruthy();
  }));
});
