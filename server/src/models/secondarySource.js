import mongoose from 'mongoose';

const secondarySourceSchema = new mongoose.Schema(
  {
    title: String,
    value: Number,
    unit: String,
    description: String,
    username: String,
    element: String
  },
  {
    timestamps: true
  }
);

const SecondarySource = mongoose.model(
  'SecondarySource',
  secondarySourceSchema
);

export default SecondarySource;
