export enum RemoteAccess {
  None,
  VPN,
}

export const getNormalizedRemoteAccess1 = () => {
  return 0;
};

export const getNormalizedRemoteAccess = (
  remoteAccess: RemoteAccess,
  target: RemoteAccess,
) => {
  return remoteAccess === target ? 0 : 1;
};
