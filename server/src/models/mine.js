import mongoose from 'mongoose';

const mineSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    locationType: String,
    mineral: String,
    caratAverage: Number,
    status: String,
    productionValue: Number,
    unit: String,
    impactPreventLocalDeprivation: String,
    description: String,
    username: String,
    element: String
  },
  {
    timestamps: true
  }
);

const Mine = mongoose.model('Mine', mineSchema);

export default Mine;
