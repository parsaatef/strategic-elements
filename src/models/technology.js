import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema(
  {
    title: String,
    level: String,
    strategicImportance: String,
    availabilityInIran: String,
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
