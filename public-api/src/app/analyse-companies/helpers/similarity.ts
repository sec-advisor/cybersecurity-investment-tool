// import euclideanDistance from 'euclidean-distance';

import { Company } from '../models/company.interface';
import {
  Cloud,
  CloudEnum,
  getNormalizedCloud,
  getNormalizedCloud1,
} from './models/cloud-comparer';
import {
  Country,
  getNormalizedCountry,
  getNormalizedCountry1,
} from './models/country-comparer';
import {
  CyberAttackThreats,
  getNormalizedCyberAttackThreats,
  getNormalizedCyberAttackThreats1,
} from './models/cyber-attack-threats-comparer';
import {
  getNormalizedMultifactor,
  getNormalizedMultifactor1,
  Multifactor,
} from './models/multifactor-comparer';
import {
  getNormalizedNetworkInfrastructure,
  getNormalizedNetworkInfrastructure1,
  NetworkInfrastructure,
} from './models/network-infrastructor-comparer';
import {
  getNormalizedOrganizationSize,
  getNormalizedOrganizationSize1,
  OrganizationSize,
} from './models/organization-size-comparer';
import {
  getNormalizedRemoteAccess,
  getNormalizedRemoteAccess1,
  RemoteAccess,
} from './models/remote-access-comparer';
import {
  getNormalizedRemote,
  getNormalizedRemote1,
} from './models/remote_comparer';

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
  data: object[],
): object[] => {
  findBoundaries(data);
  normalizeData(compareCompany, data);
  return calculateEuclideanDistance(compareCompany, data);
};

const numericFactors = [
  'revenue',
  'marketShare',
  'growthRate',
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

const normalizeData = (compareCompany: Company, data: object[]) => {
  data.forEach((d) => {
    const country = d['country' as keyof typeof d] as string;
    const organizationSize = d['org_size' as keyof typeof d] as string;
    const remote = d['remote' as keyof typeof d] as string;
    const cyberAttackThreats = d[
      'cyberAttackThreats' as keyof typeof d
    ] as CyberAttackThreats;
    const cloud = d['cloud' as keyof typeof d] as Cloud;
    const multifactor = d['multifactor' as keyof typeof d] as Multifactor;
    const networkInfrastructure = d[
      'networkInfrastructure' as keyof typeof d
    ] as NetworkInfrastructure;
    const remoteAccess = d['remoteAccess' as keyof typeof d] as RemoteAccess;

    normalizeProps(d, numericFactors);
    (d['countryN' as keyof typeof d] as number) = getNormalizedCountry(country);
    (d['org_sizeN' as keyof typeof d] as number) =
      getNormalizedOrganizationSize(organizationSize);
    (d['remoteN' as keyof typeof d] as number) = getNormalizedRemote(remote);
    (d['cyberAttackThreatsN' as keyof typeof d] as number) =
      getNormalizedCyberAttackThreats(
        cyberAttackThreats,
        compareEconomicCompany(compareCompany).cyberAttackThreats,
      );
    (d['cloudN' as keyof typeof d] as number) = getNormalizedCloud(
      compareTechnicalCompany(compareCompany).cloud,
    );
    (d['multifactorN' as keyof typeof d] as number) = getNormalizedMultifactor(
      multifactor,
      compareTechnicalCompany(compareCompany).multifactor,
    );
    (d['networkInfrastructureN' as keyof typeof d] as number) =
      getNormalizedNetworkInfrastructure(
        networkInfrastructure,
        compareTechnicalCompany(compareCompany).networkInfrastructure,
      );
    (d['remoteAccessN' as keyof typeof d] as number) =
      getNormalizedRemoteAccess(
        remoteAccess,
        compareTechnicalCompany(compareCompany).remoteAccess,
      );
  });
};

const normalizeProps = (data: object, props: string[]) => {
  props.forEach((p) => {
    const boundary = boundaries[p as keyof typeof data] as MinMax;
    const value = data[p as keyof typeof data] as number;

    (data[`${p}N` as keyof typeof data] as number) =
      (value - boundary.min) / (boundary.max - boundary.min);
  });
};

const findBoundaries = (data: object[]) => {
  data.forEach((d) => {
    // const revenue = d['revenue' as keyof typeof d] as number;
    // const marketShare = d['marketShare' as keyof typeof d] as number;
    // const growthRate = d['growthRate' as keyof typeof d] as number;

    numericFactors.forEach((factor) => {
      const value = d[factor as keyof typeof d] as number;
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

    // if (!boundaries) {
    //   boundaries = {
    //     revenue: { min: revenue, max: revenue },
    //     marketShare: { min: marketShare, max: marketShare },
    //     growthRate: { min: growthRate, max: growthRate }
    //   }
    // } else {
    //   boundaries.revenue.min = boundaries.revenue.min < revenue ? boundaries.revenue.min : revenue;
    //   boundaries.revenue.max = boundaries.revenue.max > revenue ? boundaries.revenue.max : revenue;
    //   boundaries.marketShare.min = boundaries.marketShare.min < marketShare ? boundaries.marketShare.min : marketShare;
    //   boundaries.marketShare.max = boundaries.marketShare.max > marketShare ? boundaries.marketShare.max : marketShare;
    //   boundaries.growthRate.min = boundaries.growthRate.min < growthRate ? boundaries.growthRate.min : growthRate;
    //   boundaries.growthRate.max = boundaries.growthRate.max > growthRate ? boundaries.growthRate.max : growthRate;
    // }
  });
  console.log(boundaries);
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

const calculateEuclideanDistance = (
  compareCompany: Company,
  data: object[],
): object[] => {
  const compareObject = [
    normalize(compareBusinessCompany(compareCompany), 'revenue'),
    normalize(compareBusinessCompany(compareCompany), 'marketShare'),
    normalize(compareBusinessCompany(compareCompany), 'growthRate'),
    getNormalizedCountry1(compareBusinessCompany(compareCompany).country),
    getNormalizedOrganizationSize1(
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

  return data.map((object) => ({
    ...object,
    euclideanDistanceBusiness: euclideanDistance(compareObject, [
      object['revenueN' as keyof typeof object],
      object['marketShareN' as keyof typeof object],
      object['growthRateN' as keyof typeof object],
      object['countryN' as keyof typeof object],
      object['org_sizeN' as keyof typeof object],
      object['remoteN' as keyof typeof object],
    ]),
    euclideanDistanceEconomic: euclideanDistance(economicCompareObject, [
      object['cybersecurityInvestmentN' as keyof typeof object],
      object['cybersecurityBudgetN' as keyof typeof object],
      object['cybersecurityStaffingN' as keyof typeof object],
      object['cybersecurityTrainingInvestmentN' as keyof typeof object],
      object['cybersecurityInsuranceInvestmentN' as keyof typeof object],
      object['cyberAttackThreatsN' as keyof typeof object],
    ]),
    euclideanDistanceTechnical: euclideanDistance(technicalCompareObject, [
      object['cloudN' as keyof typeof object],
      object['multifactorN' as keyof typeof object],
      object['networkInfrastructureN' as keyof typeof object],
      object['remoteAccessN' as keyof typeof object],
    ]),
    pearsonCorrelationBusiness: calculateCorrelation(compareObject, [
      object['revenueN' as keyof typeof object],
      object['marketShareN' as keyof typeof object],
      object['growthRateN' as keyof typeof object],
      object['countryN' as keyof typeof object],
      object['org_sizeN' as keyof typeof object],
      object['remoteN' as keyof typeof object],
    ]),
    pearsonCorrelationEconomic: calculateCorrelation(economicCompareObject, [
      object['cybersecurityInvestmentN' as keyof typeof object],
      object['cybersecurityBudgetN' as keyof typeof object],
      object['cybersecurityStaffingN' as keyof typeof object],
      object['cybersecurityTrainingInvestmentN' as keyof typeof object],
      object['cybersecurityInsuranceInvestmentN' as keyof typeof object],
      object['cyberAttackThreatsN' as keyof typeof object],
    ]),
    pearsonCorrelationTechnical: calculateCorrelation(technicalCompareObject, [
      object['cloudN' as keyof typeof object],
      object['multifactorN' as keyof typeof object],
      object['networkInfrastructureN' as keyof typeof object],
      object['remoteAccessN' as keyof typeof object],
    ]),
  }));
};
