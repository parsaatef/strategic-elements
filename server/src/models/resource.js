import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    location: String,
    primarySource: Number,
    unit: String,
    secondarySource: String,
    description: String,
    moreInfo: String,
    username: String,
    element: String
  },
  {
    timestamps: true
  }
);

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
