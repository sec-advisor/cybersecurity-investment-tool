export enum CloudEnum {
  None = 0,
  Private = 1,
  Public = 2,
  Hybrid = 3,
}

const cloudMapping = {
  None: 0,
  Private: 1,
  Public: 2,
  Hybrid: 3,
};

export type Cloud = keyof typeof cloudMapping;

export const getNormalizedCloud = (cloud: CloudEnum) => {
  return cloud / Object.keys(cloudMapping).length;
};
