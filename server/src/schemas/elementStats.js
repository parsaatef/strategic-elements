import Joi from 'joi';

const location = Joi.string()
  .min(2)
  .max(60)
  .required()
  .label('Location');

const locationType = Joi.string()
  .required()
  .valid('iran', 'world')
  .label('Location Type');

// const resourceValue = Joi.number().label('Resource Value');

const productionValue = Joi.number()
  .required()
  .label('Production Value');

const consumptionValue = Joi.number().label('Consumption Value');

const exportValue = Joi.number().label('Export Value');

const importValue = Joi.number().label('Import Value');

const secondaryProductionValue = Joi.number().label(
  'Secondary Production Value'
);

/* const mineCount = Joi.number()
  .min(0)
  .max(100000)
  .label('Mine Count'); */

const year = Joi.number()
  .min(1950)
  .max(2050)
  .required()
  .label('Year');

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

const unit = Joi.string()
  .empty('')
  .label('Unit');

const description = Joi.string()
  .empty('')
  .label('Description');

export const registerElementStats = Joi.object().keys({
  location,
  locationType,
  productionValue,
  consumptionValue,
  exportValue,
  importValue,
  secondaryProductionValue,
  // mineCount,
  year,
  username,
  element,
  unit,
  description
});

export const updateElementStats = Joi.object().keys({
  location,
  locationType,
  productionValue,
  consumptionValue,
  exportValue,
  importValue,
  secondaryProductionValue,
  // mineCount,
  year,
  element,
  unit,
  description
});
