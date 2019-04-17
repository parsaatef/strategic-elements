import mongoose from 'mongoose';

const mineralSchema = new mongoose.Schema(
  {
    title: String,
    formula: String,
    color: String,
    abundance: String,
    description: String,
    elements: [String],
    username: String
  },
  {
    timestamps: true
  }
);

const Mineral = mongoose.model('Mineral', mineralSchema);

export default Mineral;
