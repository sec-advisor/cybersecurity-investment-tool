import { FormGroup } from '@angular/forms';
import { SegmentDefinition } from '@app/api/api-interfaces';

export interface SegmentRegistrationStream {
  form: FormGroup,
  typeOptions: { id: string, description: string }[]
  segments: SegmentDefinition[];
}
