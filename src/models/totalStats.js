import mongoose from 'mongoose';

const totalStatsSchema = new mongoose.Schema(
  {
    name: String,
    value: String,
    year: Number,
    unit: String,
    username: String,
    element: String
  },
  {
    timestamps: true
  }
);

const TotalStats = mongoose.model('TotalStats', totalStatsSchema);

export default TotalStats;
