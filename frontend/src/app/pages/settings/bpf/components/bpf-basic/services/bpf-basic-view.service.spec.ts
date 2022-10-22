/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { BpfBasicViewService } from './bpf-basic-view.service';

describe('Service: BpfBasicView', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [BpfBasicViewService],
    });
  });

  it('should ...', inject(
    [BpfBasicViewService],
    (service: BpfBasicViewService) => {
      expect(service).toBeTruthy();
    },
  ));
});
