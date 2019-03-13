import mongoose from 'mongoose';

const mineSchema = new mongoose.Schema(
  {
    title: String,
    activeMines: Number,
    productionValue: Number,
    unit: String,
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
