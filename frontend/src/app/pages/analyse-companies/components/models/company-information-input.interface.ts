export interface CompanyInformationInput {
  name: string;
  description: string;
}

export interface CompanyInformationNumberInput extends CompanyInformationInput {
  type: 'number';
}

export interface CompanyInformationNumberSelection
  extends CompanyInformationInput {
  type: 'select';
  options: { key: string; value: string }[];
}

export type CompanyInformationAnyInput =
  | CompanyInformationNumberInput
  | CompanyInformationNumberSelection;
