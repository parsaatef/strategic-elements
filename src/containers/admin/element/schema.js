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
  atomicNumber: yup.number(),
  toxicity: yup.string(),
  magneticProperty: yup.string(),
  electricalConductivity: yup.string(),
  group: yup.string(),
  category: yup.string().required(),
  period: yup.string(),
  atomicWeight: yup.number(),
  usage1: yup.string(),
  usage2: yup.string(),
  usage3: yup.string(),
  concentrationInEarthsCrust: yup.number(),
  description: yup.string(),
  usage4: yup.string()
});

export default schema;
