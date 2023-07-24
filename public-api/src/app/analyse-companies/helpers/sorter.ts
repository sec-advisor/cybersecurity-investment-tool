export const sortPearson = (
  data: object[],
  prop: string,
  xClosests?: number,
) => {
  const sortedArray = [
    ...data.sort(
      (a, b) =>
        getAbsoluteDistanceToZero(a[prop as keyof object]) -
        getAbsoluteDistanceToZero(b[prop as keyof object]),
    ),
  ];

  return xClosests === undefined
    ? sortedArray
    : sortedArray.slice(0, xClosests);
};

export const sortEuclidean = (
  data: object[],
  prop: string,
  xClosests?: number,
) => {
  const sortedArray = [
    ...data.sort(
      (a, b) =>
        (a[prop as keyof object] as number) -
        (b[prop as keyof object] as number),
    ),
  ];

  return xClosests === undefined
    ? sortedArray
    : sortedArray.slice(0, xClosests);
};

const getAbsoluteDistanceToZero = (value: number) => Math.abs(0 - value);
