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
// return value / Object.keys(countryDistanceMapping).length;

// export const getNormalizedCountryDb = (countries: string) => {
//   if (countries === `['None']`) {
//     return 1;
//   }
//   const array = mapArray(countries);

//   // TODO CH: Currently only taking first country
//   const value = getCountryValue(array[0] as Country);
//   return normalize(value);
//   // return value / Object.keys(countryDistanceMapping).length;
// };

const normalize = (country: number) =>
  (country - countryDistanceMapping.CAN) /
  (countryDistanceMapping.TUR - countryDistanceMapping.CAN);
