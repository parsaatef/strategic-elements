import mongoose from 'mongoose';

const totalStatsSchema = new mongoose.Schema(
  {
    name: String,
    value: String,
    year: Number,
    username: String,
    element: String
  },
  {
    timestamps: true
  }
);

const TotalStats = mongoose.model('TotalStats', totalStatsSchema);

export default TotalStats;
