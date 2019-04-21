import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema(
  {
    name: String,
    value: String,
    type: String,
    element: String,
    username: String
  },
  {
    timestamps: true
  }
);

const Option = mongoose.model('Option', optionSchema);

export default Option;
