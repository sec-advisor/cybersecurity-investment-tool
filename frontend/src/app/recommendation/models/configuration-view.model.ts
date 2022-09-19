import { FormGroup } from '@angular/forms';

import { BusinessProfile, Segment } from '../../../../libs/api-interfaces';

export interface ConfigurationViewModel {
  segment: Segment;
  form: FormGroup;
  profile: BusinessProfile;
  attackTypeLabels: string[] | undefined;
  attackTypes: { label: string; values: string[] }[] | undefined;
}
