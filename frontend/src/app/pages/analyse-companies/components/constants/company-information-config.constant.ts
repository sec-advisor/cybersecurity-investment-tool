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

const getEnumValue = <T extends object>(
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

  // let result: { key: string; value: string }[] = [];
  // for (const enumMember in object) {
  //   const isValueProperty = Number(enumMember) >= 0;
  //   if (isValueProperty) {
  //     result = [
  //       ...result,
  //       {
  //         key: object[enumMember] as string,
  //         value: object[enumMember] as string,
  //       },
  //     ];
  //     //  console.log("enum member: ", myEnum[enumMember]);
  //   }
  // }
  // return result;
};

export const getCompanyInformationInputs: CompanyInformationAnyInput[] = [
  { name: 'revenue', description: 'Revenue', type: 'number' },
  { name: 'marketShare', description: 'Market Shared', type: 'number' },
  { name: 'growthRate', description: 'Growth Rate', type: 'number' },
  {
    name: 'country',
    description: 'Country',
    type: 'select',
    options: Object.keys(countryDistanceMapping).map((key) => ({
      key,
      value: key,
    })),
  },
  {
    name: 'organizationSize',
    description: 'Organization Size',
    type: 'select',
    options: Object.keys(organizationSizeMapping).map((key) => ({
      key,
      value: key,
    })),
  },
  { name: 'remote', description: 'Remote', type: 'number' },
  {
    name: 'cybersecurityInvestment',
    description: 'Cybersecurity Investment',
    type: 'number',
  },
  {
    name: 'cybersecurityBudget',
    description: 'Cybersecurity Budget',
    type: 'number',
  },
  {
    name: 'cybersecurityStaffing',
    description: 'Cybersecurity Staffing',
    type: 'number',
  },
  {
    name: 'cybersecurityTrainingInvestment',
    description: 'Cybersecurity Training Investment',
    type: 'number',
  },
  {
    name: 'cybersecurityInsuranceInvestment',
    description: 'Cybersecurity Insurance Investment',
    type: 'number',
  },
  {
    name: 'cyberAttackThreats',
    description: 'Cybersecurity Threats',
    type: 'select',
    options: getEnumValue(CyberAttackThreats),
  },
  {
    name: 'cloud',
    description: 'Cloud Solution',
    type: 'select',
    options: getEnumValue(CloudEnum),
  },
  {
    name: 'multifactor',
    description: 'Multifactor',
    type: 'select',
    options: getEnumValue(Multifactor),
  },
  {
    name: 'networkInfrastructure',
    description: 'Network Infrastructure',
    type: 'select',
    options: getEnumValue(NetworkInfrastructure),
  },
  {
    name: 'remoteAccess',
    description: 'Remote Access',
    type: 'select',
    options: getEnumValue(RemoteAccess),
  },
];
