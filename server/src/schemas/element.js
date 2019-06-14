import Joi from 'joi';

const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label('Username');

const element = Joi.string()
  // .alphanum()
  .min(2)
  .max(30)
  .required()
  .label('Element');

const elementTitle = Joi.string()
  .required()
  .label('Element Title');
const symbol = Joi.string()
  .required()
  .label('Symbol');
const chemicalFormula = Joi.string()
  .empty('')
  .label('Chemical Formula');
const phaseAtSTP = Joi.string()
  .empty('')
  .label('Phase At STP');
const density = Joi.number().label('Density');
const meltingPoint = Joi.number().label('Melting Point');
const boilingPoint = Joi.number().label('Boiling Point');
const atomicNumber = Joi.number().label('Atomic Number');
const toxicity = Joi.string()
  .empty('')
  .label('Toxicity');
const magneticProperty = Joi.string()
  .empty('')
  .label('Magnetic Property');
const electricalConductivity = Joi.string()
  .empty('')
  .label('Electrical Conductivity');
const group = Joi.string()
  .empty('')
  .label('Group');
const category = Joi.string()
  .required()
  .label('Category');
const period = Joi.string()
  .empty('')
  .label('Period');
const atomicWeight = Joi.number().label('AtomicWeight');
const usage1 = Joi.string()
  .empty('')
  .label('Usage 1');
const usage2 = Joi.string()
  .empty('')
  .label('Usage 2');
const usage3 = Joi.string()
  .empty('')
  .label('Usage 3');
const usage4 = Joi.string()
  .empty('')
  .label('Usage 4');
const concentrationInEarthsCrust = Joi.number().label(
  "Concentration In Earth's Crust"
);
const description = Joi.string()
  .empty('')
  .label('Description');

export const registerElement = Joi.object().keys({
  element,
  elementTitle,
  symbol,
  chemicalFormula,
  phaseAtSTP,
  density,
  meltingPoint,
  boilingPoint,
  atomicNumber,
  toxicity,
  magneticProperty,
  electricalConductivity,
  group,
  category,
  period,
  atomicWeight,
  usage1,
  usage2,
  usage3,
  usage4,
  concentrationInEarthsCrust,
  description,
  username
});

export const updateElement = Joi.object().keys({
  elementTitle,
  symbol,
  chemicalFormula,
  phaseAtSTP,
  density,
  meltingPoint,
  boilingPoint,
  atomicNumber,
  toxicity,
  magneticProperty,
  electricalConductivity,
  group,
  category,
  period,
  atomicWeight,
  usage1,
  usage2,
  usage3,
  usage4,
  concentrationInEarthsCrust,
  description
});
