import Joi from 'joi';

const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label('Username');

const element = Joi.string()
  .alphanum()
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
const chemicalFormula = Joi.string().label('Chemical Formula');
const phaseAtSTP = Joi.string().label('Phase At STP');
const density = Joi.number().label('Density');
const meltingPoint = Joi.number().label('Melting Point');
const boilingPoint = Joi.number().label('Boiling Point');
const hardness = Joi.number().label('Hardness');
const toxicity = Joi.boolean().label('Toxicity');
const magneticProperty = Joi.boolean().label('Magnetic Property');
const electricalConductivity = Joi.string().label('Electrical Conductivity');
const group = Joi.string()
  .required()
  .label('Group');
const period = Joi.string().label('Period');
const atomicWeight = Joi.number().label('AtomicWeight');
const electronegativity = Joi.number().label('Electronegativity');
const oxidationStates = Joi.string().label('Oxidation States');
const electronConfiguration = Joi.string().label('Electron Configuration');
const atomicRadius = Joi.number().label('Atomic Radius');
const concentrationInEarthsCrust = Joi.number().label(
  "Concentration In Earth's Crust"
);
const description = Joi.string()
  .empty('')
  .label('Description');
const relatedIndustryDesc = Joi.string()
  .empty('')
  .label('Related Industry Desc');
const technologyLevelDesc = Joi.string()
  .empty('')
  .label('Technology Level Desc');
const lowLevelIndustryDesc = Joi.string()
  .empty('')
  .label('Low Level Industry Desc');
const threatyDesc = Joi.string()
  .empty('')
  .label('Threaty Desc');
const secondaryResourcesDesc = Joi.string()
  .empty('')
  .label('Secondary Resources Desc');
const ecologyDesc = Joi.string()
  .empty('')
  .label('Ecology Desc');

export const registerElement = Joi.object().keys({
  element,
  elementTitle,
  symbol,
  chemicalFormula,
  phaseAtSTP,
  density,
  meltingPoint,
  boilingPoint,
  hardness,
  toxicity,
  magneticProperty,
  electricalConductivity,
  group,
  period,
  atomicWeight,
  electronegativity,
  oxidationStates,
  electronConfiguration,
  atomicRadius,
  concentrationInEarthsCrust,
  description,
  relatedIndustryDesc,
  technologyLevelDesc,
  lowLevelIndustryDesc,
  threatyDesc,
  secondaryResourcesDesc,
  ecologyDesc,
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
  hardness,
  toxicity,
  magneticProperty,
  electricalConductivity,
  group,
  period,
  atomicWeight,
  electronegativity,
  oxidationStates,
  electronConfiguration,
  atomicRadius,
  concentrationInEarthsCrust,
  description,
  relatedIndustryDesc,
  technologyLevelDesc,
  lowLevelIndustryDesc,
  threatyDesc,
  secondaryResourcesDesc,
  ecologyDesc
});
