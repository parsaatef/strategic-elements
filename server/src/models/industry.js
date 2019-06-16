import mongoose from 'mongoose';

const industrySchema = new mongoose.Schema(
  {
    title: String,
    type: String,
    strategicImportance: String,
    economicSignificance: String,
    jobCreationRate: String,
    description: String,
    moreInfo: String,
    username: String,
    element: String
  },
  {
    timestamps: true
  }
);

const Industry = mongoose.model('Industry', industrySchema);

export default Industry;
