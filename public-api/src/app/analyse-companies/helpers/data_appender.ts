import { CloudEnum } from './models/cloud-comparer';
import { CyberAttackThreats } from './models/cyber-attack-threats-comparer';
import { Multifactor } from './models/multifactor-comparer';
import { NetworkInfrastructure } from './models/network-infrastructor-comparer';
import { RemoteAccess } from './models/remote-access-comparer';

export const appendData = (data: object[]): object[] => {
  return data.map((d, index) => ({ ...d, id: index, ...getRandomData() }));
};

const getRandomData = () => {
  const a = {
    revenue: randomInteger(270000000, 90000000000),
    marketShare: randomInteger(0, 100),
    growthRate: randomInteger(-100, 100),

    cybersecurityBudget: randomInteger(1000000, 6000000),
    cybersecurityStaffing: randomInteger(5, 300),
    cybersecurityTrainingInvestment: randomInteger(10000, 2000000),
    cybersecurityInsuranceInvestment: randomInteger(50000, 9000000),
    cyberAttackThreats: randomEnum(CyberAttackThreats),

    cloud: randomEnum(CloudEnum),
    multifactor: randomEnum(Multifactor),
    networkInfrastructure: randomEnum(NetworkInfrastructure),
    remoteAccess: randomEnum(RemoteAccess),
  };
  console.log(a);
  return {
    ...a,
    cybersecurityInvestment: (a.revenue / 100) * randomInteger(4, 15),
  };
};

const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomEnum = <T>(anEnum: T): T[keyof T] => {
  const enumValues = Object.keys(anEnum as unknown as object)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
};
