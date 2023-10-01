import { mapArray } from '../array-mapper';

const countryDistanceMapping = {
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

export type Country = keyof typeof countryDistanceMapping;

export const getCountryValue = (country: Country): number => {
  return countryDistanceMapping[country];
};

export const getNormalizedCountry = (country: Country) => {
  const value = countryDistanceMapping[country];
  return normalize(value);
};

const normalize = (country: number) =>
  (country - countryDistanceMapping.CAN) /
  (countryDistanceMapping.TUR - countryDistanceMapping.CAN);
