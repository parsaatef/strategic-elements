import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema(
  {
    title: String,
    level: String,
    strategicImportance: String,
    economicSignificance: String,
    rateOfJobCreation: String,
    AvailabilityInIran: String,
    description: String,
    element: String,
    username: String
  },
  {
    timestamps: true
  }
);

const Technology = mongoose.model('Technology', technologySchema);

export default Technology;
