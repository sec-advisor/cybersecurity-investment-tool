export interface Message {
  message: string;
}

export interface SegmentDefinition {
  key: string;
  description: string;
  valueEstimation: {
    inputs: Input[];
    calculation: string;
  }
}

interface Input {
  key: string;
  description: string;
  type: 'number',
  value?: number;
}

export interface ValueEstimation {
  segment: SegmentDefinition,
  keyValuePairs: { key: string; value: number; }[]
}

export interface BusinessProfile {
  id?: string;
  companyName: string;
  revenue: number;
  numberOfEmployees: number;
  region: string;
}
