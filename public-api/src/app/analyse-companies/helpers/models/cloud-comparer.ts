export enum CloudEnum {
  None = 0,
  Private = 1,
  Public = 2,
  Hybrid = 3,
};


const cloudMapping = {
  None: 0,
  Private: 1,
  Public: 2,
  Hybrid: 3,
};

// export enum Cloud {
//   None = 0,
//   Private = 1,
//   Public = 2,
//   Hybrid = 3,
// }

export type Cloud = keyof typeof cloudMapping;

export const getCloudValue = (cloud: Cloud): number => {
  return cloudMapping[cloud];
};

export const getNormalizedCloud1 = (cloud: CloudEnum) => {
  // const a = CloudEnum.Hybrid;
  // const b = CloudEnum[a]
  // const value = cloudMapping[cloud];
  return cloud / Object.keys(cloudMapping).length;
};

export const getNormalizedCloud = (cloud: CloudEnum) => {
  // if (cloud === `['None']`) {
  //   console.log('hit');
  //   // TODO CH: fix properly
  //   return 1;
  // }

  // const array = mapArray(organizationSize);

  // const value = getOrganizationSizeValue(array[0] as OrganizationSize);
  // const value = cloudMapping[cloud];
  return cloud / Object.keys(cloudMapping).length;
};

// export const getNormalizedCloud1 = () => {
//   return 0;
// };

// export const getNormalizedCloud = (cloud: Cloud, target: Cloud) => {
//   return cloud === target ? 0 : 1;
// };
