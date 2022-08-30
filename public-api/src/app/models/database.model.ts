import * as mongoose from 'mongoose';

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
