// import euclideanDistance from 'euclidean-distance';
import {
  Company,
  CompanyRawData,
  CompanyWithDistance,
} from '../models/company.interface';
import {
  getNormalizedCloud,
  getNormalizedCloud1,
} from './models/cloud-comparer';
import {
  getNormalizedCountryDb,
  getNormalizedCountry,
} from './models/country-comparer';
import {
  getNormalizedCyberAttackThreats,
  getNormalizedCyberAttackThreats1,
} from './models/cyber-attack-threats-comparer';
import {
  getNormalizedMultifactor,
  getNormalizedMultifactor1,
} from './models/multifactor-comparer';
import {
  getNormalizedNetworkInfrastructure,
  getNormalizedNetworkInfrastructure1,
} from './models/network-infrastructor-comparer';
import {
  getNormalizedOrganizationSizeDb,
  getNormalizedOrganizationSize,
} from './models/organization-size-comparer';
import {
  getNormalizedRemoteAccess,
  getNormalizedRemoteAccess1,
} from './models/remote-access-comparer';
import { getNormalizedRemote1 } from './models/remote_comparer';

// eslint-disable-next-line prettier/prettier
const calculateCorrelation = require('calculate-correlation');
const euclideanDistance = require('euclidean-distance');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// import euclideanDistance from 'euclidean-distance';

// export interface Boundaries {
//   revenue: MinMax;
//   marketShare: MinMax;
//   growthRate: MinMax;
// }

export interface Boundaries {
  [key: string]: MinMax;
}

export interface MinMax {
  min: number;
  max: number;
}

export let boundaries: Boundaries;

export const findSimilarity = (
  compareCompany: Company,
  data: CompanyRawData[],
): CompanyWithDistance[] => {
  findBoundaries(data);
  normalizeData(compareCompany, data);
  return applyCorrelationMeassures(compareCompany, data);
};

const numericFactors: (keyof CompanyRawData)[] = [
  'revenue',
  'marketShare',
  'growthRate',
  'cybersecurityInvestment',
  'cybersecurityBudget',
  'cybersecurityStaffing',
  'cybersecurityTrainingInvestment',
  'cybersecurityInsuranceInvestment',
  'remote',
];

export const normalize = (data: object, prop: string) => {
  const boundary = boundaries[prop as keyof typeof boundaries] as MinMax;
  const value = data[prop as keyof typeof data] as number;
  return (value - boundary.min) / (boundary.max - boundary.min);
};

const normalizeData = (
  compareCompany: Company,
  companies: CompanyRawData[],
) => {
  companies.forEach((company) => {
    const country = company.country;
    const organizationSize = company.organizationSize;
    const cyberAttackThreats = company.cyberAttackThreats;
    const cloud = company.cloud;
    const multifactor = company.multifactor;
    const networkInfrastructure = company.networkInfrastructure;
    const remoteAccess = company.remoteAccess;

    normalizeNumericFactors(company, numericFactors);
    (company['countryN' as keyof typeof company] as number) =
      getNormalizedCountryDb(country);
    (company['organizationSizeN' as keyof typeof company] as number) =
      getNormalizedOrganizationSizeDb(organizationSize);
    // (company['remoteN' as keyof typeof company] as number) =
    //   getNormalizedRemote(remote);
    (company['cyberAttackThreatsN' as keyof typeof company] as number) =
      getNormalizedCyberAttackThreats(
        cyberAttackThreats,
        compareEconomicCompany(compareCompany).cyberAttackThreats,
      );
    (company['cloudN' as keyof typeof company] as number) = getNormalizedCloud(
      compareTechnicalCompany(compareCompany).cloud,
    );
    (company['multifactorN' as keyof typeof company] as number) =
      getNormalizedMultifactor(
        multifactor,
        compareTechnicalCompany(compareCompany).multifactor,
      );
    (company['networkInfrastructureN' as keyof typeof company] as number) =
      getNormalizedNetworkInfrastructure(
        networkInfrastructure,
        compareTechnicalCompany(compareCompany).networkInfrastructure,
      );
    (company['remoteAccessN' as keyof typeof company] as number) =
      getNormalizedRemoteAccess(
        remoteAccess,
        compareTechnicalCompany(compareCompany).remoteAccess,
      );
  });
};

const normalizeNumericFactors = (
  company: CompanyRawData,
  props: (keyof CompanyRawData)[],
) => {
  props.forEach((prop) => {
    const boundary = boundaries[prop];
    const value = company[prop] as number;

    (company[`${prop}N` as keyof typeof company] as number) =
      (value - boundary.min) / (boundary.max - boundary.min);
  });
};

const findBoundaries = (companies: CompanyRawData[]) => {
  companies.forEach((company) => {
    numericFactors.forEach((factor) => {
      const value = company[factor] as number;
      if (!boundaries || !boundaries[factor]) {
        boundaries = {
          ...(boundaries ?? {}),
          [factor]: { min: value, max: value },
        };
      } else {
        boundaries[factor].min =
          boundaries[factor].min < value ? boundaries[factor].min : value;
        boundaries[factor].max =
          boundaries[factor].max > value ? boundaries[factor].max : value;
      }
    });
  });
};

// TODO CH: Industry missing
const compareBusinessCompany = (compareCompany: Company) => ({
  revenue: compareCompany.revenue,
  marketShare: compareCompany.marketShare,
  growthRate: compareCompany.growthRate,
  country: compareCompany.country,
  organizationSize: compareCompany.organizationSize,
  remote: compareCompany.remote,
});
const compareEconomicCompany = (compareCompany: Company) => ({
  cybersecurityInvestment: compareCompany.cybersecurityInvestment,
  cybersecurityBudget: compareCompany.cybersecurityBudget,
  cybersecurityStaffing: compareCompany.cybersecurityStaffing,
  cybersecurityTrainingInvestment:
    compareCompany.cybersecurityTrainingInvestment,
  cybersecurityInsuranceInvestment:
    compareCompany.cybersecurityInsuranceInvestment,
  cyberAttackThreats: compareCompany.cyberAttackThreats,
});
const compareTechnicalCompany = (compareCompany: Company) => ({
  cloud: compareCompany.cloud,
  multifactor: compareCompany.multifactor,
  networkInfrastructure: compareCompany.networkInfrastructure,
  remoteAccess: compareCompany.remoteAccess,
});

const applyCorrelationMeassures = (
  compareCompany: Company,
  data: CompanyRawData[],
): CompanyWithDistance[] => {
  const compareObject = [
    normalize(compareBusinessCompany(compareCompany), 'revenue'),
    normalize(compareBusinessCompany(compareCompany), 'marketShare'),
    normalize(compareBusinessCompany(compareCompany), 'growthRate'),
    getNormalizedCountry(compareBusinessCompany(compareCompany).country),
    getNormalizedOrganizationSize(
      compareBusinessCompany(compareCompany).organizationSize,
    ),
    getNormalizedRemote1(compareBusinessCompany(compareCompany).remote),
  ];

  const economicCompareObject = [
    normalize(
      compareEconomicCompany(compareCompany),
      'cybersecurityInvestment',
    ),
    normalize(compareEconomicCompany(compareCompany), 'cybersecurityBudget'),
    normalize(compareEconomicCompany(compareCompany), 'cybersecurityStaffing'),
    normalize(
      compareEconomicCompany(compareCompany),
      'cybersecurityTrainingInvestment',
    ),
    normalize(
      compareEconomicCompany(compareCompany),
      'cybersecurityInsuranceInvestment',
    ),
    getNormalizedCyberAttackThreats1(),
  ];

  const technicalCompareObject = [
    getNormalizedCloud1(compareTechnicalCompany(compareCompany).cloud),
    getNormalizedMultifactor1(),
    getNormalizedNetworkInfrastructure1(),
    getNormalizedRemoteAccess1(),
  ];

  return data.map(
    (company) =>
      ({
        ...company,
        euclideanDistanceBusiness: euclideanDistance(compareObject, [
          company['revenueN' as keyof typeof company],
          company['marketShareN' as keyof typeof company],
          company['growthRateN' as keyof typeof company],
          company['countryN' as keyof typeof company],
          company['organizationSizeN' as keyof typeof company],
          company['remoteN' as keyof typeof company],
        ]),
        euclideanDistanceEconomic: euclideanDistance(economicCompareObject, [
          company['cybersecurityInvestmentN' as keyof typeof company],
          company['cybersecurityBudgetN' as keyof typeof company],
          company['cybersecurityStaffingN' as keyof typeof company],
          company['cybersecurityTrainingInvestmentN' as keyof typeof company],
          company['cybersecurityInsuranceInvestmentN' as keyof typeof company],
          company['cyberAttackThreatsN' as keyof typeof company],
        ]),
        euclideanDistanceTechnical: euclideanDistance(technicalCompareObject, [
          company['cloudN' as keyof typeof company],
          company['multifactorN' as keyof typeof company],
          company['networkInfrastructureN' as keyof typeof company],
          company['remoteAccessN' as keyof typeof company],
        ]),
        pearsonCorrelationBusiness: calculateCorrelation(compareObject, [
          company['revenueN' as keyof typeof company],
          company['marketShareN' as keyof typeof company],
          company['growthRateN' as keyof typeof company],
          company['countryN' as keyof typeof company],
          company['organizationSizeN' as keyof typeof company],
          company['remoteN' as keyof typeof company],
        ]),
        pearsonCorrelationEconomic: calculateCorrelation(
          economicCompareObject,
          [
            company['cybersecurityInvestmentN' as keyof typeof company],
            company['cybersecurityBudgetN' as keyof typeof company],
            company['cybersecurityStaffingN' as keyof typeof company],
            company['cybersecurityTrainingInvestmentN' as keyof typeof company],
            company[
              'cybersecurityInsuranceInvestmentN' as keyof typeof company
            ],
            company['cyberAttackThreatsN' as keyof typeof company],
          ],
        ),
        pearsonCorrelationTechnical: calculateCorrelation(
          technicalCompareObject,
          [
            company['cloudN' as keyof typeof company],
            company['multifactorN' as keyof typeof company],
            company['networkInfrastructureN' as keyof typeof company],
            company['remoteAccessN' as keyof typeof company],
          ],
        ),
      } as unknown as CompanyWithDistance),
  );
};
