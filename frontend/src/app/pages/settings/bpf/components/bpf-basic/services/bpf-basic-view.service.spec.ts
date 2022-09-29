/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BpfBasicViewService } from './bpf-basic-view.service';

describe('Service: BpfBasicView', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BpfBasicViewService]
    });
  });

  it('should ...', inject([BpfBasicViewService], (service: BpfBasicViewService) => {
    expect(service).toBeTruthy();
  }));
});
