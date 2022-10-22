import { FormGroup } from '@angular/forms';
import { SegmentDefinition } from '@libs';

export interface SegmentRegistrationStream {
  form: FormGroup;
  typeOptions: { id: string; description: string }[];
  segments: SegmentDefinition[];
}
