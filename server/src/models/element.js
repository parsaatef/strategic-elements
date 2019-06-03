import mongoose from 'mongoose';

const elementSchema = new mongoose.Schema(
  {
    element: String,
    elementTitle: String,
    symbol: String,
    chemicalFormula: String,
    phaseAtSTP: String,
    density: Number,
    meltingPoint: Number,
    boilingPoint: Number,
    hardness: Number,
    toxicity: Boolean,
    magneticProperty: Boolean,
    electricalConductivity: String,
    group: String,
    category: String,
    period: String,
    atomicWeight: Number,
    electronegativity: Number,
    oxidationStates: String,
    electronConfiguration: String,
    atomicRadius: Number,
    concentrationInEarthsCrust: Number,
    description: String,
    relatedIndustryDesc: String,
    technologyLevelDesc: String,
    lowLevelIndustryDesc: String,
    threatyDesc: String,
    secondaryResourcesDesc: String,
    ecologyDesc: String,
    offset: String,
    username: String
  },
  {
    timestamps: true
  }
);

const Element = mongoose.model('Element', elementSchema);

export default Element;
