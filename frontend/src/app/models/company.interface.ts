export interface Company {
  name?: string;
  revenue: number;
  marketShare: number;
  growthRate: number;
  country: Country;
  organizationSize: OrganizationSize;
  remote: number;
  cybersecurityInvestment: number;
  cybersecurityBudget: number;
  cybersecurityStaffing: number;
  cybersecurityTrainingInvestment: number;
  cybersecurityInsuranceInvestment: number;
  cyberAttackThreats: CyberAttackThreats;
  cloud: CloudEnum;
  multifactor: Multifactor;
  networkInfrastructure: NetworkInfrastructure;
  remoteAccess: RemoteAccess;
}

export const countryDistanceMapping = {
  CAN: -5,
  US: -4,
  FRA: -1,
  UK: -2,
  SCA: 2,
  GER: 0,
  ITA: 1,
  TUR: 3,
  ESP: -3,
};

export type Country = keyof typeof countryDistanceMapping;

export const organizationSizeMapping = {
  Micro: 0,
  Small: 1,
  Medium: 2,
  Large: 3,
};

export type OrganizationSize = keyof typeof organizationSizeMapping;

export enum CyberAttackThreats {
  Malware,
  DoS,
  ManInTheMiddle,
  Phishing,
  SQLInjection,
}

export enum CloudEnum {
  None = 0,
  Private = 1,
  Public = 2,
  Hybrid = 3,
}

export enum Multifactor {
  None,
  Multifactor,
}

export enum NetworkInfrastructure {
  LAN,
  WAN,
  Wireless,
}

export enum RemoteAccess {
  None,
  VPN,
}
