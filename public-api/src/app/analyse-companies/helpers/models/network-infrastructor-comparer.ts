export enum NetworkInfrastructure {
  LAN,
  WAN,
  Wireless,
}

export const getNormalizedNetworkInfrastructure1 = () => {
  return 0;
};

export const getNormalizedNetworkInfrastructure = (
  networkInfrastructure: NetworkInfrastructure,
  target: NetworkInfrastructure,
) => {
  return networkInfrastructure === target ? 0 : 1;
};
