import mongoose from 'mongoose';

const elementSchema = new mongoose.Schema(
  {
    element: String,
    elementTitle: String,
    chemicalFormula: String,
    symbol: String,
    phaseAtSTP: String,
    group: String,
    period: String,
    category: String,
    atomicNumber: Number,
    atomicWeight: Number,
    density: Number,
    meltingPoint: Number,
    boilingPoint: Number,
    electricalConductivity: String,
    magneticProperty: String,
    toxicity: String,
    concentrationInEarthsCrust: Number,
    usage1: String,
    usage2: String,
    usage3: String,
    usage4: String,
    description: String,
    offset: String,
    username: String
  },
  {
    timestamps: true
  }
);

const Element = mongoose.model('Element', elementSchema);

export default Element;
