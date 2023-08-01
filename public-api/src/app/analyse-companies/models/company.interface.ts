import { CloudEnum } from '../helpers/models/cloud-comparer';
import { Country } from '../helpers/models/country-comparer';
import { CyberAttackThreats } from '../helpers/models/cyber-attack-threats-comparer';
import { Multifactor } from '../helpers/models/multifactor-comparer';
import { NetworkInfrastructure } from '../helpers/models/network-infrastructor-comparer';
import { OrganizationSize } from '../helpers/models/organization-size-comparer';
import { RemoteAccess } from '../helpers/models/remote-access-comparer';

export interface CompanyComparisonDto {
  euclideanDistanceBusiness: CompanyDto[];
  euclideanDistanceEconomic: CompanyDto[];
  euclideanDistanceTechnical: CompanyDto[];
  pearsonCorrelationBusiness: CompanyDto[];
  pearsonCorrelationEconomic: CompanyDto[];
  pearsonCorrelationTechnical: CompanyDto[];
}

export interface Company {
  id: number;
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
  bpf: string;
}

export interface CompanyDto {
  id: number;
  euclideanDistanceBusiness: number;
  euclideanDistanceEconomic: number;
  euclideanDistanceTechnical: number;
  pearsonCorrelationBusiness: number;
  pearsonCorrelationEconomic: number;
  pearsonCorrelationTechnical: number;
}

export interface CompanyWithDistance extends Company {
  euclideanDistanceBusiness: number;
  euclideanDistanceEconomic: number;
  euclideanDistanceTechnical: number;
  pearsonCorrelationBusiness: number;
  pearsonCorrelationEconomic: number;
  pearsonCorrelationTechnical: number;
}

export interface CompanyRawData {
  id: number;
  revenue: number;
  marketShare: number;
  growthRate: number;
  cybersecurityBudget: number;
  cybersecurityStaffing: number;
  cybersecurityTrainingInvestment: number;
  cybersecurityInsuranceInvestment: number;
  cyberAttackThreats: CyberAttackThreats;
  networkInfrastructure: NetworkInfrastructure;
  remoteAccess: RemoteAccess;
  cybersecurityInvestment: number;
  cloud: CloudEnum;
  country: string;
  multifactor: Multifactor;
  org_size: string;
  remote: string;
  bpf: string;
  sharedData: (keyof CompanyRawData)[];
}

export type SharedCompanyData = Omit<Partial<CompanyRawData>, 'sharedData'>;
