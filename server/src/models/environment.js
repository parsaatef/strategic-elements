import mongoose from 'mongoose';

const environmentSchema = new mongoose.Schema(
  {
    waterConsumption: String,
    energyConsumption: String,
    greenhouseGasEmissions: String,
    risksWasteAWasteWater: String,
    productionProcessRisksHuman: String,
    moreInfo: String,
    username: String,
    element: String
  },
  {
    timestamps: true
  }
);

const Environment = mongoose.model('Environment', environmentSchema);

export default Environment;
