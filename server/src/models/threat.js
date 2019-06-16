import mongoose from 'mongoose';

const threatSchema = new mongoose.Schema(
  {
    effectivenessSanctions: String,
    impactTariffs: String,
    levelGovernmentalSupport: String,
    diffRawMaterialValueAProcessedProduct: String,
    moreInfo: String,
    username: String,
    element: String
  },
  {
    timestamps: true
  }
);

const Threat = mongoose.model('Threat', threatSchema);

export default Threat;
