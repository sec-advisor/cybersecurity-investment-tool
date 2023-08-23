export const organizationSizeMapping = {
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

export const getNormalizedOrganizationSize = (
  organizationSize: OrganizationSize,
) => {
  const value = organizationSizeMapping[organizationSize];
  return value / Object.keys(organizationSizeMapping).length;
};

export const getNormalizedOrganizationSizeDb = (value: number) => {
  return value / Object.keys(organizationSizeMapping).length;
};
