import mongoose from 'mongoose';

const elementSchema = new mongoose.Schema(
  {
    price: Number,
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

const GlobalPrice = mongoose.model('GlobalPrice', elementSchema);

export default GlobalPrice;
