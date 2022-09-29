export interface TestSegment {
  name: string;
  risk: number;
  value: number;
  vulnerability: number;
  calculatedVulnerability?: number;
  optimalInvestment?: number;
}
