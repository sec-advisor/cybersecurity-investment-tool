import { mapArray } from '../array-mapper';

const organizationSizeMapping = {
  Micro: 0,
  Small: 1,
  Medium: 2,
  Large: 3,
};

export type OrganizationSize = keyof typeof organizationSizeMapping;

export const getOrganizationSizeValue = (
  organizationSize: OrganizationSize,
): number => {
  return organizationSizeMapping[organizationSize];
};

export const getNormalizedOrganizationSize1 = (
  organizationSize: OrganizationSize,
) => {
  const value = organizationSizeMapping[organizationSize];
  return value / Object.keys(organizationSizeMapping).length;
};

export const getNormalizedOrganizationSize = (organizationSize: string) => {
  if (organizationSize === `['None']`) {
    console.log('hit');
    // TODO CH: fix properly
    return 1;
  }

  const array = mapArray(organizationSize);

  const value = getOrganizationSizeValue(array[0] as OrganizationSize);
  return value / Object.keys(organizationSizeMapping).length;
};
