export enum Multifactor {
  None,
  Multifactor,
}

export const getNormalizedMultifactor1 = () => {
  return 0;
};

export const getNormalizedMultifactor = (
  multifactor: Multifactor,
  target: Multifactor,
) => {
  return multifactor === target ? 0 : 1;
};
