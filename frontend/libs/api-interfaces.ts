export interface Message {
  message: string;
}

export interface SegmentDefinition {
  key: string;
  description: string;
  supportedThreats: { label: string; values: string[] }[];
  valueEstimation?: {
    inputs: Input[];
    calculation: string;
  };
}

export interface Input {
  key: string;
  description: string;
  type: 'number';
  value?: number;
}

export interface Segment {
  id?: string;
  companyId?: string;
  name: string;
  type: string;
  typeDescription: string;
  value: number;
  risk: number;
  vulnerability: number;
  calculatedVulnerability?: number;
  optimalInvestment?: number;
  expectedLossBeforeInvestment?: number;
  expectedLossWithInvestment?: number;
  totalCybersecurityCosts?: number;
}

export interface ValueEstimation {
  segment: SegmentDefinition;
  keyValuePairs: { key: string; value: number }[];
}

export interface BusinessProfile {
  id?: string;
  companyName: string;
  revenue: number;
  numberOfEmployees: number;
  region: string;
}

export interface OptimalInvestmentEquation {
  breachProbabilityFunction: string;
  optimalInvestmentEquation: string;
}

export interface RecommendationProfile {
  region: string[];
  budget: number;
  budgetWeight: number;
  serviceType: string[];
  attackType: string[];
  deploymentTime: string;
  deploymentTimeWeight: number;
  leasingPeriod: string;
  leasingPeriodWeight: number;
}

export interface ROSIDetail {
  price: number;
  leasingPeriod: LeadingPeriod;
  mitigationRate: number;
  costOfIncident: number;
  incidenceOccurrence: number;
  rosi?: number;
}

export enum LeadingPeriod {
  Minutes,
  Days,
  Months,
}
