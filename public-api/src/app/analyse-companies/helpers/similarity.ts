import calculateCorrelation from 'calculate-correlation';

import { Cloud, getNormalizedCloud, getNormalizedCloud1 } from './models/cloud-comparer';
import { Country, getNormalizedCountry, getNormalizedCountry1 } from './models/country-comparer';
import {
  CyberAttackThreats,
  getNormalizedCyberAttackThreats,
  getNormalizedCyberAttackThreats1
} from './models/cyber-attack-threats-comparer';
import { getNormalizedMultifactor, getNormalizedMultifactor1, Multifactor } from './models/multifactor-comparer';
import {
  getNormalizedNetworkInfrastructure,
  getNormalizedNetworkInfrastructure1,
  NetworkInfrastructure
} from './models/network-infrastructor-comparer';
import {
  getNormalizedOrganizationSize,
  getNormalizedOrganizationSize1,
  OrganizationSize
} from './models/organization-size-comparer';
import { getNormalizedRemoteAccess, getNormalizedRemoteAccess1, RemoteAccess } from './models/remote-access-comparer';
import { getNormalizedRemote, getNormalizedRemote1 } from './models/remote_comparer';

// eslint-disable-next-line prettier/prettier
const calculateCorrelation = require("calculate-correlation");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const euclideanDistance = require("calculate-correlation");
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

export const findSimilarity = (data: object[]): object[] => {
  findBoundaries(data);
  normalizeData(data);
  return calculateEuclideanDistance(data);
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

const normalizeData = (data: object[]) => {
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
        compareEconomicCompany.cyberAttackThreats,
      );
    (d['cloudN' as keyof typeof d] as number) = getNormalizedCloud(
      cloud,
      compareTechnicalCompany.cloud,
    );
    (d['multifactorN' as keyof typeof d] as number) = getNormalizedMultifactor(
      multifactor,
      compareTechnicalCompany.multifactor,
    );
    (d['networkInfrastructureN' as keyof typeof d] as number) =
      getNormalizedNetworkInfrastructure(
        networkInfrastructure,
        compareTechnicalCompany.networkInfrastructure,
      );
    (d['remoteAccessN' as keyof typeof d] as number) =
      getNormalizedRemoteAccess(
        remoteAccess,
        compareTechnicalCompany.remoteAccess,
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
const compareCompany = {
  revenue: 290000000,
  marketShare: 30,
  growthRate: 50,
  country: 'GER' as Country,
  organizationSize: 'Medium' as OrganizationSize,
  remote: 50,
};
const compareEconomicCompany = {
  cybersecurityInvestment: 2000000,
  cybersecurityBudget: 2000000,
  cybersecurityStaffing: 50,
  cybersecurityTrainingInvestment: 30000,
  cybersecurityInsuranceInvestment: 10000,
  cyberAttackThreats: CyberAttackThreats.DoS,
};
const compareTechnicalCompany = {
  cloud: Cloud.Private,
  multifactor: Multifactor.Multifactor,
  networkInfrastructure: NetworkInfrastructure.WAN,
  remoteAccess: RemoteAccess.VPN,
};

const calculateEuclideanDistance = (data: object[]): object[] => {
  const compareObject = [
    normalize(compareCompany, 'revenue'),
    normalize(compareCompany, 'marketShare'),
    normalize(compareCompany, 'growthRate'),
    getNormalizedCountry1(compareCompany.country),
    getNormalizedOrganizationSize1(compareCompany.organizationSize),
    getNormalizedRemote1(compareCompany.remote),
  ];

  const economicCompareObject = [
    normalize(compareEconomicCompany, 'cybersecurityInvestment'),
    normalize(compareEconomicCompany, 'cybersecurityBudget'),
    normalize(compareEconomicCompany, 'cybersecurityStaffing'),
    normalize(compareEconomicCompany, 'cybersecurityTrainingInvestment'),
    normalize(compareEconomicCompany, 'cybersecurityInsuranceInvestment'),
    getNormalizedCyberAttackThreats1(),
  ];

  const technicalCompareObject = [
    getNormalizedCloud1(),
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
