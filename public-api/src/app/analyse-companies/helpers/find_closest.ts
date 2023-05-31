export const findClosed = (data: object[], prop: string) => {
  return data.reduce<object>(
    (prev, curr) => {
      const euclideanDistance = curr[prop as keyof typeof curr];
      const currentClosest = prev[prop as keyof typeof prev];

      return Math.abs(euclideanDistance) < Math.abs(currentClosest)
        ? curr
        : prev;
    },
    {
      euclideanDistanceBusiness: 9999999,
      euclideanDistanceEconomic: 9999999,
      euclideanDistanceTechnical: 9999999,
    } as unknown as object,
  );
};

export const findClosed1 = (data: object[], prop: string) => {
  return data.reduce<object>(
    (prev, curr) => {
      const pearsonCorrelation = curr[prop as keyof typeof curr];
      const currentClosest = prev[prop as keyof typeof prev];

      return pearsonCorrelation > currentClosest ? curr : prev;
    },
    {
      pearsonCorrelationBusiness: -1,
      pearsonCorrelationEconomic: -1,
    } as unknown as object,
  );
};
