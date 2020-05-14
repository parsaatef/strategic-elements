import Joi from 'joi';

const waterConsumption = Joi.string()
  .min(2)
  .max(60)
  .required()
  .label('Water Consumption');

const energyConsumption = Joi.string()
  .min(2)
  .max(60)
  .label('Energy Consumption');

const greenhouseGasEmissions = Joi.string()
  .min(2)
  .max(60)
  .label('Greenhouse Gas Emissions');

const risksWasteAWasteWater = Joi.string()
  .min(2)
  .max(60)
  .required()
  .label('Risks of Waste And Waste Water');

const productionProcessRisksHuman = Joi.string()
  .min(2)
  .max(60)
  .label('Production Process Risks for Human');

const moreInfo = Joi.string()
  .empty('')
  .label('More Info');

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

export const registerEnvironment = Joi.object().keys({
  waterConsumption,
  energyConsumption,
  greenhouseGasEmissions,
  risksWasteAWasteWater,
  productionProcessRisksHuman,
  moreInfo,
  username,
  element
});

export const updateEnvironment = Joi.object().keys({
  waterConsumption,
  energyConsumption,
  greenhouseGasEmissions,
  risksWasteAWasteWater,
  productionProcessRisksHuman,
  moreInfo,
  element
});
