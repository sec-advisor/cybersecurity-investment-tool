import { CompanyDto } from '../models/company.interface';

export const sortPearson = (
  companies: CompanyDto[],
  type: 'business' | 'economic' | 'technical',
  xClosests?: number,
) => {
  const sortedArray = [
    ...companies.sort((a, b) => {
      const aValue =
        type === 'business'
          ? a.pearsonCorrelationBusiness
          : type === 'economic'
          ? a.pearsonCorrelationEconomic
          : a.pearsonCorrelationTechnical;

      const bValue =
        type === 'business'
          ? b.pearsonCorrelationBusiness
          : type === 'economic'
          ? b.pearsonCorrelationEconomic
          : b.pearsonCorrelationTechnical;

      return (
        getAbsoluteDistanceToZero(aValue) - getAbsoluteDistanceToZero(bValue)
      );
    }),
  ];

  return xClosests === undefined
    ? sortedArray
    : sortedArray.slice(0, xClosests);
};

export const sortEuclidean = (
  companies: CompanyDto[],
  type: 'business' | 'economic' | 'technical',
  xClosests?: number,
) => {
  const sortedArray = [
    ...companies.sort((a, b) => {
      const aValue =
        type === 'business'
          ? a.euclideanDistanceBusiness
          : type === 'economic'
          ? a.euclideanDistanceEconomic
          : a.euclideanDistanceTechnical;

      const bValue =
        type === 'business'
          ? b.euclideanDistanceBusiness
          : type === 'economic'
          ? b.euclideanDistanceEconomic
          : b.euclideanDistanceTechnical;

      return aValue - bValue;
    }),
  ];

  return xClosests === undefined
    ? sortedArray
    : sortedArray.slice(0, xClosests);
};

const getAbsoluteDistanceToZero = (value: number) => Math.abs(0 - value);
