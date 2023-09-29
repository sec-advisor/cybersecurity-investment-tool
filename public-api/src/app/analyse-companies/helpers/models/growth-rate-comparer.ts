const min = -100;
const max = 100;

export const getNormalizedGrowthRate = (value: number) => {
  return (value - min) / (max - min);
};
