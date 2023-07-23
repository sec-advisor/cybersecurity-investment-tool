import { CloudEnum } from '../helpers/models/cloud-comparer';
import { Country } from '../helpers/models/country-comparer';
import { CyberAttackThreats } from '../helpers/models/cyber-attack-threats-comparer';
import { Multifactor } from '../helpers/models/multifactor-comparer';
import { NetworkInfrastructure } from '../helpers/models/network-infrastructor-comparer';
import { OrganizationSize } from '../helpers/models/organization-size-comparer';
import { RemoteAccess } from '../helpers/models/remote-access-comparer';

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
