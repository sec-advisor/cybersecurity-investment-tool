import * as mongoose from 'mongoose';
import { Multifactor } from '../analyse-companies/helpers/models/multifactor-comparer';
import { CloudEnum } from '../analyse-companies/helpers/models/cloud-comparer';
import { CyberAttackThreats } from '../analyse-companies/helpers/models/cyber-attack-threats-comparer';
import { NetworkInfrastructure } from '../analyse-companies/helpers/models/network-infrastructor-comparer';
import { RemoteAccess } from '../analyse-companies/helpers/models/remote-access-comparer';

const inputType = new mongoose.Schema({
  key: String,
  description: String,
  type: String,
});

const supportedThread = new mongoose.Schema({
  label: String,
  values: [String],
});

export const SegmentDefinitionSchema = new mongoose.Schema({
  key: String,
  description: String,
  supportedThreats: [supportedThread],
  valueEstimation: {
    inputs: [inputType],
    calculation: String,
  },
});

export const BusinessProfileSchema = new mongoose.Schema({
  userId: String,
  companyName: String,
  revenue: Number,
  numberOfEmployees: Number,
  region: String,
});

export const SegmentSchema = new mongoose.Schema({
  companyId: String,
  name: String,
  type: String,
  typeDescription: String,
  value: Number,
  risk: Number,
  vulnerability: Number,
  calculatedVulnerability: Number,
  optimalInvestment: Number,
  expectedLossBeforeInvestment: Number,
  expectedLossWithInvestment: Number,
  totalCybersecurityCosts: Number,
});

export const OptimalInvestmentEquationSchema = new mongoose.Schema({
  breachProbabilityFunction: String,
  optimalInvestmentEquation: String,
});

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export interface User extends mongoose.Document {
  _id: string;
  username: string;
  password: string;
}

export const SettingsSchema = new mongoose.Schema({
  userId: String,
  bpf: String,
});

// export const CompanySchema = new mongoose.Schema({
//   id: Number,
//   revenue: Number,
//   marketShare: Number,
//   growthRate: Number,
//   cybersecurityBudget: Number,
//   cybersecurityStaffing: Number,
//   cybersecurityTrainingInvestment: Number,
//   cybersecurityInsuranceInvestment: Number,
//   cyberAttackThreats: CyberAttackThreats,
//   networkInfrastructure: NetworkInfrastructure,
//   remoteAccess: RemoteAccess,
//   cybersecurityInvestment: Number,
//   cloud: CloudEnum,
//   country: String,
//   multifactor: Multifactor,
//   organizationSize: Number,
//   remote: Number,
//   bpf: String,
//   sharedData: [String],
// });
