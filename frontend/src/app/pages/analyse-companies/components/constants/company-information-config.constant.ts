import {
  CloudEnum,
  countryDistanceMapping,
  CyberAttackThreats,
  Multifactor,
  NetworkInfrastructure,
  organizationSizeMapping,
  RemoteAccess
} from '../../../../models/company.interface';
import { CompanyInformationAnyInput } from '../models/company-information-input.interface';

const getEnumValues = <T extends object>(
  object: T,
): { key: string; value: string }[] => {
  return Object.entries(object).reduce<{ key: string; value: string }[]>(
    (pre, [key, value]) => {
      if (!(Number(key) >= 0)) {
        const object = { key: value, value: key };
        pre = [...pre, object];
      }
      return pre;
    },
    [],
  );
};

export const getCompanyInformationInputs: CompanyInformationAnyInput[] = [
  {
    name: 'revenue',
    description: 'Revenue',
    type: 'number',
    info: 'Yearly revenue',
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
  },
  {
    name: 'marketShare',
    description: 'Market Shared (%)',
    type: 'number',
    info: `Company's market share`,
    min: 0,
    max: 100,
  },
  {
    name: 'growthRate',
    description: 'Growth Rate (%)',
    type: 'number',
    info: `Company's growth rate`,
    min: -100,
    max: 100,
  },
  {
    name: 'country',
    description: 'Country',
    type: 'select',
    options: Object.keys(countryDistanceMapping).map((key) => ({
      key,
      value: key,
    })),
    info: `Country of company`,
  },
  {
    name: 'organizationSize',
    description: 'Organization Size',
    type: 'select',
    options: Object.keys(organizationSizeMapping).map((key) => ({
      key,
      value: key,
    })),
    info: `Company's organization size`,
  },
  {
    name: 'remote',
    description: 'Remote Employees (%)',
    type: 'number',
    info: `Percentage of remote working employees`,
    min: 0,
    max: 100,
  },
  {
    name: 'cybersecurityInvestment',
    description: 'Cybersecurity Investment',
    type: 'number',
    info: `Total cybersecurity investment`,
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
  },
  {
    name: 'cybersecurityBudget',
    description: 'Cybersecurity Budget',
    type: 'number',
    info: `Available cybersecurity budget`,
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
  },
  {
    name: 'cybersecurityStaffing',
    description: 'Cybersecurity Staffing',
    type: 'number',
    info: `Number of employees which working in the cybersecurity area`,
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
  },
  {
    name: 'cybersecurityTrainingInvestment',
    description: 'Cybersecurity Training Investment',
    type: 'number',
    info: `Amount of money spent for cybersecurity training`,
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
  },
  {
    name: 'cybersecurityInsuranceInvestment',
    description: 'Cybersecurity Insurance Investment',
    type: 'number',
    info: `Amount of money spent for cybersecurity insurance`,
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
  },
  {
    name: 'cyberAttackThreats',
    description: 'Cybersecurity Threats',
    type: 'select',
    options: getEnumValues(CyberAttackThreats),
    info: `Biggest cybersecurity threat`,
  },
  {
    name: 'cloud',
    description: 'Cloud Solution',
    type: 'select',
    options: getEnumValues(CloudEnum),
    info: `Company's cloud solution`,
  },
  {
    name: 'multifactor',
    description: 'Multifactor',
    type: 'select',
    options: getEnumValues(Multifactor),
    info: `Is multifactor authentication implemented?`,
  },
  {
    name: 'networkInfrastructure',
    description: 'Network Infrastructure',
    type: 'select',
    options: getEnumValues(NetworkInfrastructure),
    info: `Company's network infrastructure`,
  },
  {
    name: 'remoteAccess',
    description: 'Remote Access',
    type: 'select',
    options: getEnumValues(RemoteAccess),
    info: `Company's remote access`,
  },
];
