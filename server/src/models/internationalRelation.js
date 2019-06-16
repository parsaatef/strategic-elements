import mongoose from 'mongoose';

const internationalRelationSchema = new mongoose.Schema(
  {
    country: String,
    relationLevel: String,
    moreInfo: String,
    username: String
  },
  {
    timestamps: true
  }
);

const InternationalRelation = mongoose.model(
  'InternationalRelation',
  internationalRelationSchema
);

export default InternationalRelation;
