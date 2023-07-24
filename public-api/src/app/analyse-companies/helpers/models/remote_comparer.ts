import { mapArray } from '../array-mapper';

export const getNormalizedRemote1 = (remote: number) => {
  return remote / 100;
};

export const getNormalizedRemote = (remote: string) => {
  if (remote === `['None']`) {
    console.log('remote None');
    // TODO CH: fix properly
    return 1;
  }

  const array = mapArray(remote);

  const value = +array[0].replaceAll('%', '');
  return value / 100;
};
