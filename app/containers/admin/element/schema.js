import * as yup from 'yup';

const schema = yup.object({
  element: yup
    .string()
    .min(2)
    .max(30)
    .required(),
  elementTitle: yup.string().required(),
  symbol: yup.string().required(),
  chemicalFormula: yup.string(),
  phaseAtSTP: yup.string(),
  density: yup.number(),
  meltingPoint: yup.number(),
  boilingPoint: yup.number(),
  hardness: yup.number(),
  toxicity: yup.bool(),
  magneticProperty: yup.bool(),
  electricalConductivity: yup.string(),
  group: yup.string().required(),
  category: yup.string().required(),
  period: yup.string(),
  atomicWeight: yup.number(),
  electronegativity: yup.number(),
  oxidationStates: yup.string(),
  electronConfiguration: yup.string(),
  atomicRadius: yup.number(),
  concentrationInEarthsCrust: yup.number(),
  description: yup.string(),
  relatedIndustryDesc: yup.string(),
  technologyLevelDesc: yup.string(),
  lowLevelIndustryDesc: yup.string(),
  threatyDesc: yup.string(),
  secondaryResourcesDesc: yup.string(),
  ecologyDesc: yup.string()
});

export default schema;
