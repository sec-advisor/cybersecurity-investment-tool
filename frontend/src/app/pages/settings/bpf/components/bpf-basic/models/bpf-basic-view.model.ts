import { FormGroup } from '@angular/forms';

export interface BpfBasicViewModel {
  error?: string;
  viewModel?: { variables: BpfBasicVariable[]; form: FormGroup };
}

export interface BpfBasicVariable {
  controlName: string;
  description: string;
  name: string;
  value: number;
}
