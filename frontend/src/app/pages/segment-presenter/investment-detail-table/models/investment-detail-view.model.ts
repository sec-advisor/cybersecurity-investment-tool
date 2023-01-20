import { FormGroup } from '@angular/forms';
import { Segment, SegmentDetail } from '@libs';

export interface InvestmentDetailViewModel {
  segment: Segment | undefined;
  form: FormGroup;
  customInvestment: SegmentDetail | undefined;
}
