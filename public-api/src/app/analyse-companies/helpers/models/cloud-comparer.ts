export enum Cloud {
  None,
  Private,
  Public,
  Hybrid,
}

export const getNormalizedCloud1 = () => {
  return 0;
};

export const getNormalizedCloud = (cloud: Cloud, target: Cloud) => {
  return cloud === target ? 0 : 1;
};
