import { mapArray } from '../array-mapper';

const countryDistanceMapping = {
  CAN: -5,
  US: -4,
  FRA: -1,
  UK: -2,
  SCA: 2,
  GER: 0,
  ITA: 1,
  TUR: 3,
  ESP: -3,
};

export type Country = keyof typeof countryDistanceMapping;

export const getCountryValue = (country: Country): number => {
  return countryDistanceMapping[country];
};

export const getNormalizedCountry1 = (country: Country) => {
  const value = countryDistanceMapping[country];
  return value / Object.keys(countryDistanceMapping).length;
};

export const getNormalizedCountry = (countries: string) => {
  if (countries === `['None']`) {
    return 1;
  }
  const array = mapArray(countries);

  // TODO CH: Currently only taking first country
  const value = getCountryValue(array[0] as Country);
  return value / Object.keys(countryDistanceMapping).length;
};
