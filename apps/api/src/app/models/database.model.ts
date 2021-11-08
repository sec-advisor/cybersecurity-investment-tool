import * as mongoose from 'mongoose';

const inputType = new mongoose.Schema({
  key: String,
  description: String,
  type: String,
});

export const SegmentDefinitionSchema = new mongoose.Schema(
  {
    key: String,
    description: String,
    valueEstimation: {
      inputs: [inputType],
      calculation: String,
    }
  }
)

export const BusinessProfileSchema = new mongoose.Schema(
  {
    companyName: String,
    revenue: Number,
    numberOfEmployees: Number,
    region: String,
  }
)
