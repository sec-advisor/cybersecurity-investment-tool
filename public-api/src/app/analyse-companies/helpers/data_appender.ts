import { CompanyRawData } from '../models/company.interface';
import { CloudEnum } from './models/cloud-comparer';
import { Country } from './models/country-comparer';
import { CyberAttackThreats } from './models/cyber-attack-threats-comparer';
import { Multifactor } from './models/multifactor-comparer';
import { NetworkInfrastructure } from './models/network-infrastructor-comparer';
import { organizationSizeMapping } from './models/organization-size-comparer';
import { RemoteAccess } from './models/remote-access-comparer';

export const appendData = (data: object[]): CompanyRawData[] => {
  return data
    .map((d, index) =>
      index === 0 ? undefined : { id: index, ...getRandomData(d) },
    )
    .filter((company) => !!company);
};

const getRandomData = (company: object) => {
  // const a = {
  //   // revenue: randomInteger(270000000, 90000000000),
  //   // marketShare: randomInteger(0, 100),
  //   // growthRate: randomInteger(-100, 100),
  //   // country: getCountry(company['country']),

  //   // cybersecurityBudget: randomInteger(1000000, 6000000),
  //   // cybersecurityStaffing: randomInteger(5, 300),
  //   cybersecurityTrainingInvestment: randomInteger(10000, 2000000),
  //   cybersecurityInsuranceInvestment: randomInteger(50000, 9000000),
  //   // cyberAttackThreats: randomEnum(CyberAttackThreats),

  //   // cloud: randomEnum(CloudEnum),
  //   // multifactor: randomEnum(Multifactor),
  //   // networkInfrastructure: randomEnum(NetworkInfrastructure),
  //   // remoteAccess: randomEnum(RemoteAccess),
  //   // remote: getRemote(company['remote']),
  //   // organizationSize: getOrgSizeValue(company['organizationSize']),
  //   // bpf: getBpf(),
  //   // sharedData: getSharedProperties(),
  // } as CompanyRawData;
  // return {
  //   ...a,
  //   cybersecurityInvestment: (a.revenue / 100) * randomInteger(4, 15),
  // } as CompanyRawData;

  return getCompany(company);
};

const getCompany = (company: object) => {
  const organizationSize = getOrgSizeValue(company['organizationSize']);
  let configuredCompany: Partial<CompanyRawData>;
  if (organizationSize === 0) {
    configuredCompany = getMicroCompany();
  } else if (organizationSize === 1) {
    configuredCompany = getSmallCompany();
  } else if (organizationSize === 2) {
    configuredCompany = getMediumCompany();
  } else {
    configuredCompany = getLargeCompany();
  }

  return {
    ...configuredCompany,
    country: getCountry(company['country']),
    cloud: randomEnum(CloudEnum),
    multifactor: randomEnum(Multifactor),
    networkInfrastructure: randomEnum(NetworkInfrastructure),
    remoteAccess: randomEnum(RemoteAccess),
    remote: getRemote(company['remote']),
    organizationSize,
    bpf: getBpf(),
    sharedData: getSharedProperties(),
    cyberAttackThreats: randomEnum(CyberAttackThreats),
    marketShare: randomInteger(0, 100),
    growthRate: randomInteger(-100, 100),
  } as CompanyRawData;
};

const getMicroCompany = () => {
  const revenue = randomInteger(100000, 5000000);
  const cybersecurityBudget = revenue * 0.005;

  return {
    revenue,
    cybersecurityBudget,
    cybersecurityStaffing: randomInteger(0, 5),
    cybersecurityTrainingInvestment: cybersecurityBudget * 0.05,
    cybersecurityInsuranceInvestment: cybersecurityBudget * 0.07,
    cybersecurityInvestment: cybersecurityBudget * 0.75,
  };
};

const getSmallCompany = () => {
  const revenue = randomInteger(5000000, 10000000);
  const cybersecurityBudget = revenue * 0.005;

  return {
    revenue,
    cybersecurityBudget,
    cybersecurityStaffing: randomInteger(5, 30),
    cybersecurityTrainingInvestment: cybersecurityBudget * 0.05,
    cybersecurityInsuranceInvestment: cybersecurityBudget * 0.07,
    cybersecurityInvestment: cybersecurityBudget * 0.75,
  };
};

const getMediumCompany = () => {
  const revenue = randomInteger(10000000, 1000000000);
  const cybersecurityBudget = revenue * 0.005;

  return {
    revenue,
    cybersecurityBudget,
    cybersecurityStaffing: randomInteger(30, 70),
    cybersecurityTrainingInvestment: cybersecurityBudget * 0.05,
    cybersecurityInsuranceInvestment: cybersecurityBudget * 0.07,
    cybersecurityInvestment: cybersecurityBudget * 0.75,
  };
};

const getLargeCompany = () => {
  const revenue = randomInteger(150000000000, 611000000000);
  const cybersecurityBudget = revenue * 0.005;

  return {
    revenue,
    cybersecurityBudget,
    cybersecurityStaffing: randomInteger(30, 80),
    cybersecurityTrainingInvestment: cybersecurityBudget * 0.05,
    cybersecurityInsuranceInvestment: cybersecurityBudget * 0.07,
    cybersecurityInvestment: cybersecurityBudget * 0.75,
  };
};

const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomEnum = <T>(anEnum: T): T[keyof T] => {
  const enumValues = Object.keys(anEnum as unknown as object)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
};

const getBpf = () => {
  const random = randomInteger(0, 100);

  if (random < 25) return 'v/(1+(z/(L*0.001)))';
  if (random < 50) return '2v/(1+(z/(L*0.001)))';
  if (random < 75) return '3v/(1+(z/(L*0.001)))';
  if (random <= 100) return '4v/(1+(z/(L*0.001)))';
};

const getRemote = (remoteValue: string): number => {
  const value = remoteValue
    .replaceAll(`'`, '')
    .replaceAll('[', '')
    .replaceAll(']', '')
    .replaceAll('%', '');

  const isNumber = Number.isFinite(+value);
  return isNumber ? +value : randomInteger(0, 100);
};

const getOrgSizeValue = (organizationSizeValue: string): number => {
  const value = organizationSizeValue
    .replaceAll(`'`, '')
    .replaceAll('[', '')
    .replaceAll(']', '')
    .replaceAll('%', '');

  const isOrgSizeDefined = organizationSizeMapping[value];

  return isOrgSizeDefined ? Number(isOrgSizeDefined) : randomInteger(0, 3);
};

const getSharedProperties = (): (keyof CompanyRawData)[] => {
  const random = randomInteger(0, 100);

  if (random < 25)
    return [
      'cloud',
      'country',
      'multifactor',
      'organizationSize',
      'remote',
      'marketShare',
      'growthRate',
      'cybersecurityBudget',
      'cybersecurityStaffing',
      'cybersecurityTrainingInvestment',
      'cyberAttackThreats',
      'networkInfrastructure',
      'remoteAccess',
      'cybersecurityInvestment',
      'bpf',
    ];
  if (random < 50)
    return [
      'cloud',
      'country',
      'multifactor',
      'remote',
      'marketShare',
      'growthRate',
      'cybersecurityBudget',
      'cybersecurityTrainingInvestment',
      'cyberAttackThreats',
      'remoteAccess',
      'cybersecurityInvestment',
      'bpf',
    ];
  if (random < 75)
    return [
      'country',
      'multifactor',
      'organizationSize',
      'remote',
      'growthRate',
      'cybersecurityStaffing',
      'cyberAttackThreats',
      'remoteAccess',
      'cybersecurityInvestment',
      'bpf',
    ];
  if (random <= 100)
    return [
      'multifactor',
      'remote',
      'cybersecurityBudget',
      'cybersecurityStaffing',
      'cyberAttackThreats',
      'networkInfrastructure',
      'cybersecurityInvestment',
      'bpf',
    ];
};
const getCountry = (country: string): string => {
  const countries = country
    .replaceAll('[', '')
    .replaceAll(']', '')
    .replaceAll(`'`, '')
    .replaceAll(' ', '')
    .split(',');

  return countries[0] === 'None' ? getRandomCountry() : countries[0];
};

const getRandomCountry = (): Country => {
  const mappingObject = {
    CAN: -5,
    US: -4,
    ESP: -3,
    UK: -2,
    FRA: -1,
    GER: 0,
    ITA: 1,
    SCA: 2,
    TUR: 3,
  };
  const randomValue = randomInteger(-5, 3);
  const b = Object.entries(mappingObject).find(
    ([_key, value]) => value === randomValue,
  )[0] as Country;
  return b;
};
