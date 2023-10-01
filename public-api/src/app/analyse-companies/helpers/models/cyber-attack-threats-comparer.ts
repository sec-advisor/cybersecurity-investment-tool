export enum CyberAttackThreats {
  Malware,
  DoS,
  ManInTheMiddle,
  Phishing,
  SQLInjection,
}

export const getNormalizedCyberAttackThreatsDefaultValue = () => {
  return 0;
};

export const getNormalizedCyberAttackThreats = (
  thread: CyberAttackThreats,
  target: CyberAttackThreats,
) => {
  return thread === target ? 0 : 1;
};
