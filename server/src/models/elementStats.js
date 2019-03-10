import mongoose from 'mongoose';

const elementStatsSchema = new mongoose.Schema(
  {
    location: String,
    locationType: String,
    resourceValue: Number,
    productionValue: Number,
    consumptionValue: Number,
    exportValue: Number,
    importValue: Number,
    secondaryProductionValue: Number,
    mineCount: Number,
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
