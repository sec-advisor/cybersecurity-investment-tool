import { CompanyDto, CompanyWithDistance } from '../models/company.interface';

export const findClosedEuclidean = (
  companies: CompanyDto[],
  type: 'business' | 'economic' | 'technical',
) => {
  return companies.reduce<CompanyDto>((pre, curr) => {
    const euclideanDistance =
      type === 'business'
        ? curr.euclideanDistanceBusiness
        : type === 'economic'
        ? curr.euclideanDistanceEconomic
        : curr.euclideanDistanceTechnical;
    const currentClosest = pre
      ? type === 'business'
        ? pre.euclideanDistanceBusiness
        : type === 'economic'
        ? pre.euclideanDistanceEconomic
        : pre.euclideanDistanceTechnical
      : 99999999999;

    // const euclideanDistance = curr[prop as keyof typeof curr];
    // const currentClosest = pre[prop as keyof typeof pre];

    return Math.abs(euclideanDistance) < Math.abs(currentClosest) ? curr : pre;
  }, undefined as unknown as CompanyDto);
};

export const findClosedPearson = (
  data: CompanyDto[],
  type: 'business' | 'economic' | 'technical',
) => {
  return data.reduce<CompanyDto>((pre, curr) => {
    const pearsonCorrelation =
      type === 'business'
        ? curr.pearsonCorrelationBusiness
        : type === 'economic'
        ? curr.pearsonCorrelationEconomic
        : curr.pearsonCorrelationTechnical;

    const currentClosest = pre
      ? type === 'business'
        ? pre.pearsonCorrelationBusiness
        : type === 'economic'
        ? pre.pearsonCorrelationEconomic
        : pre.pearsonCorrelationTechnical
      : -1;

    // const pearsonCorrelation = curr[prop as keyof typeof curr];
    // const currentClosest = pre[prop as keyof typeof pre];

    return pearsonCorrelation > currentClosest ? curr : pre;
  }, undefined as unknown as CompanyWithDistance);
};
