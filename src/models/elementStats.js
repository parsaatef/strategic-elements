import mongoose from 'mongoose';

const elementStatsSchema = new mongoose.Schema(
  {
    location: String,
    locationType: String,
    productionValue: Number,
    consumptionValue: Number,
    exportValue: Number,
    importValue: Number,
    secondaryProductionValue: Number,
    year: Number,
    unit: String,
    description: String,
    username: String,
    element: String
  },
  {
    timestamps: true
  }
);

const ElementStats = mongoose.model('ElementStats', elementStatsSchema);

export default ElementStats;
