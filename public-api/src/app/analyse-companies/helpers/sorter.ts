import { CompanyDto } from '../models/company.interface';

export const sortPearson = (
  companies: CompanyDto[],
  type: 'business' | 'economic' | 'technical' | 'all',
  xClosests?: number,
) => {
  const sortedArray = [
    ...companies.sort((a, b) => {
      const aValue =
        type === 'business'
          ? a.pearsonCorrelationBusiness
          : type === 'economic'
          ? a.pearsonCorrelationEconomic
          : type === 'technical'
          ? a.pearsonCorrelationTechnical
          : a.pearsonCorrelationAll;

      const bValue =
        type === 'business'
          ? b.pearsonCorrelationBusiness
          : type === 'economic'
          ? b.pearsonCorrelationEconomic
          : type === 'technical'
          ? b.pearsonCorrelationTechnical
          : b.pearsonCorrelationAll;

      return (
        (Number.isFinite(bValue) ? bValue : -1) -
        (Number.isFinite(aValue) ? aValue : -1)
      );
    }),
  ];

  return xClosests === undefined
    ? sortedArray
    : sortedArray.slice(0, xClosests);
};

export const sortEuclidean = (
  companies: CompanyDto[],
  type: 'business' | 'economic' | 'technical' | 'all',
  xClosests?: number,
) => {
  const sortedArray = [
    ...companies.sort((a, b) => {
      const aValue =
        type === 'business'
          ? a.euclideanDistanceBusiness
          : type === 'economic'
          ? a.euclideanDistanceEconomic
          : type === 'technical'
          ? a.euclideanDistanceTechnical
          : a.euclideanDistanceAll;

      const bValue =
        type === 'business'
          ? b.euclideanDistanceBusiness
          : type === 'economic'
          ? b.euclideanDistanceEconomic
          : type === 'technical'
          ? b.euclideanDistanceTechnical
          : b.euclideanDistanceAll;

      return aValue - bValue;
    }),
  ];

  return xClosests === undefined
    ? sortedArray
    : sortedArray.slice(0, xClosests);
};
