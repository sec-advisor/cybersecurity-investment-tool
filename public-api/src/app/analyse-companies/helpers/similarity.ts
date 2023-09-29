// import euclideanDistance from 'euclidean-distance';
import {
  Company,
  CompanyRawData,
  CompanyWithDistance,
} from '../models/company.interface';
import { getNormalizedCloud } from './models/cloud-comparer';
import { getNormalizedCountry } from './models/country-comparer';
import {
  getNormalizedCyberAttackThreats,
  getNormalizedCyberAttackThreats1,
} from './models/cyber-attack-threats-comparer';
import { getNormalizedGrowthRate } from './models/growth-rate-comparer';
import { getNormalizedMarketShared } from './models/market-shared-comparer';
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
  findBoundaries([
    ...data,
    {
      revenue: compareCompany.revenue,
      cybersecurityInvestment: compareCompany.cybersecurityInvestment,
      cybersecurityBudget: compareCompany.cybersecurityBudget,
      cybersecurityStaffing: compareCompany.cybersecurityStaffing,
      cybersecurityTrainingInvestment:
        compareCompany.cybersecurityTrainingInvestment,
      cybersecurityInsuranceInvestment:
        compareCompany.cybersecurityInsuranceInvestment,
    },
  ]);
  normalizeData(compareCompany, data);
  return applyCorrelationMeassures(compareCompany, data);
};

const factorsWithoutMinMax: (keyof CompanyRawData)[] = [
  'revenue',
  'cybersecurityInvestment',
  'cybersecurityBudget',
  'cybersecurityStaffing',
  'cybersecurityTrainingInvestment',
  'cybersecurityInsuranceInvestment',
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
    const markedShare = company.marketShare;
    const growthRate = company.growthRate;
    const cyberAttackThreats = company.cyberAttackThreats;
    const cloud = company.cloud;
    const multifactor = company.multifactor;
    const networkInfrastructure = company.networkInfrastructure;
    const remoteAccess = company.remoteAccess;
    const remote = company.remote;

    normalizeNumericFactors(company, factorsWithoutMinMax);
    (company['countryN' as keyof typeof company] as number) =
      getNormalizedCountry(country);
    (company['organizationSizeN' as keyof typeof company] as number) =
      getNormalizedOrganizationSizeDb(organizationSize);
    (company['marketShareN' as keyof typeof company] as number) =
      getNormalizedMarketShared(markedShare);
    (company['growthRateN' as keyof typeof company] as number) =
      getNormalizedGrowthRate(growthRate);
    (company['remoteN' as keyof typeof company] as number) =
      getNormalizedRemote1(remote);
    (company['cyberAttackThreatsN' as keyof typeof company] as number) =
      getNormalizedCyberAttackThreats(
        cyberAttackThreats,
        compareEconomicCompany(compareCompany).cyberAttackThreats,
      );
    (company['cloudN' as keyof typeof company] as number) =
      getNormalizedCloud(cloud);
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

const findBoundaries = (companies: Partial<CompanyRawData>[]) => {
  companies.forEach((company) => {
    factorsWithoutMinMax.forEach((factor) => {
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
  const businessTargetObject = [
    normalize(compareBusinessCompany(compareCompany), 'revenue'),
    getNormalizedMarketShared(
      compareBusinessCompany(compareCompany).marketShare,
    ),
    getNormalizedGrowthRate(compareBusinessCompany(compareCompany).growthRate),
    getNormalizedCountry(compareBusinessCompany(compareCompany).country),
    getNormalizedOrganizationSize(
      compareBusinessCompany(compareCompany).organizationSize,
    ),
    getNormalizedRemote1(compareBusinessCompany(compareCompany).remote),
  ];

  const economicTargetObject = [
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

  const technicalTargetObject = [
    getNormalizedCloud(compareTechnicalCompany(compareCompany).cloud),
    getNormalizedMultifactor1(),
    getNormalizedNetworkInfrastructure1(),
    getNormalizedRemoteAccess1(),
  ];
  console.log(economicTargetObject);
  return data.map(
    (company) =>
      ({
        ...company,
        euclideanDistanceBusiness: euclideanDistance(businessTargetObject, [
          company['revenueN' as keyof typeof company],
          company['marketShareN' as keyof typeof company],
          company['growthRateN' as keyof typeof company],
          company['countryN' as keyof typeof company],
          company['organizationSizeN' as keyof typeof company],
          company['remoteN' as keyof typeof company],
        ]),
        euclideanDistanceEconomic: euclideanDistance(economicTargetObject, [
          company['cybersecurityInvestmentN' as keyof typeof company],
          company['cybersecurityBudgetN' as keyof typeof company],
          company['cybersecurityStaffingN' as keyof typeof company],
          company['cybersecurityTrainingInvestmentN' as keyof typeof company],
          company['cybersecurityInsuranceInvestmentN' as keyof typeof company],
          company['cyberAttackThreatsN' as keyof typeof company],
        ]),
        euclideanDistanceTechnical: euclideanDistance(technicalTargetObject, [
          company['cloudN' as keyof typeof company],
          company['multifactorN' as keyof typeof company],
          company['networkInfrastructureN' as keyof typeof company],
          company['remoteAccessN' as keyof typeof company],
        ]),
        pearsonCorrelationBusiness: calculateCorrelation(businessTargetObject, [
          company['revenueN' as keyof typeof company],
          company['marketShareN' as keyof typeof company],
          company['growthRateN' as keyof typeof company],
          company['countryN' as keyof typeof company],
          company['organizationSizeN' as keyof typeof company],
          company['remoteN' as keyof typeof company],
        ]),
        pearsonCorrelationEconomic: calculateCorrelation(economicTargetObject, [
          company['cybersecurityInvestmentN' as keyof typeof company],
          company['cybersecurityBudgetN' as keyof typeof company],
          company['cybersecurityStaffingN' as keyof typeof company],
          company['cybersecurityTrainingInvestmentN' as keyof typeof company],
          company['cybersecurityInsuranceInvestmentN' as keyof typeof company],
          company['cyberAttackThreatsN' as keyof typeof company],
        ]),
        pearsonCorrelationTechnical: calculateCorrelation(
          technicalTargetObject,
          [
            company['cloudN' as keyof typeof company],
            company['multifactorN' as keyof typeof company],
            company['networkInfrastructureN' as keyof typeof company],
            company['remoteAccessN' as keyof typeof company],
          ],
        ),
        euclideanDistanceAll: euclideanDistance(
          [
            ...businessTargetObject,
            ...economicTargetObject,
            ...technicalTargetObject,
          ],
          [
            company['revenueN' as keyof typeof company],
            company['marketShareN' as keyof typeof company],
            company['growthRateN' as keyof typeof company],
            company['countryN' as keyof typeof company],
            company['organizationSizeN' as keyof typeof company],
            company['remoteN' as keyof typeof company],
            company['cybersecurityInvestmentN' as keyof typeof company],
            company['cybersecurityBudgetN' as keyof typeof company],
            company['cybersecurityStaffingN' as keyof typeof company],
            company['cybersecurityTrainingInvestmentN' as keyof typeof company],
            company[
              'cybersecurityInsuranceInvestmentN' as keyof typeof company
            ],
            company['cyberAttackThreatsN' as keyof typeof company],
            company['cloudN' as keyof typeof company],
            company['multifactorN' as keyof typeof company],
            company['networkInfrastructureN' as keyof typeof company],
            company['remoteAccessN' as keyof typeof company],
          ],
        ),
        pearsonCorrelationAll: calculateCorrelation(
          [
            ...businessTargetObject,
            ...economicTargetObject,
            ...technicalTargetObject,
          ],
          [
            company['revenueN' as keyof typeof company],
            company['marketShareN' as keyof typeof company],
            company['growthRateN' as keyof typeof company],
            company['countryN' as keyof typeof company],
            company['organizationSizeN' as keyof typeof company],
            company['remoteN' as keyof typeof company],
            company['cybersecurityInvestmentN' as keyof typeof company],
            company['cybersecurityBudgetN' as keyof typeof company],
            company['cybersecurityStaffingN' as keyof typeof company],
            company['cybersecurityTrainingInvestmentN' as keyof typeof company],
            company[
              'cybersecurityInsuranceInvestmentN' as keyof typeof company
            ],
            company['cyberAttackThreatsN' as keyof typeof company],
            company['cloudN' as keyof typeof company],
            company['multifactorN' as keyof typeof company],
            company['networkInfrastructureN' as keyof typeof company],
            company['remoteAccessN' as keyof typeof company],
          ],
        ),
      } as unknown as CompanyWithDistance),
  );
};
