import mongoose from 'mongoose';

const mineralSchema = new mongoose.Schema(
  {
    title: String,
    alias: String,
    formula: String,
    color: String,
    abundance: String,
    description: String,
    moreInfo: String,
    elements: [String],
    username: String
  },
  {
    timestamps: true
  }
);

const Mineral = mongoose.model('Mineral', mineralSchema);

export default Mineral;
