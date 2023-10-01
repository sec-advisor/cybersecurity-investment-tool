export enum Multifactor {
  None,
  Multifactor,
}

export const getNormalizedMultifactorDefault = () => {
  return 0;
};

export const getNormalizedMultifactor = (
  multifactor: Multifactor,
  target: Multifactor,
) => {
  return multifactor === target ? 0 : 1;
};
