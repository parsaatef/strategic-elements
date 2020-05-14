import Joi from 'joi';

const effectivenessSanctions = Joi.string()
  .min(2)
  .max(60)
  .label('Effectiveness Sanctions');

const impactTariffs = Joi.string()
  .min(2)
  .max(60)
  .label('Impact Tariffs');

const levelGovernmentalSupport = Joi.string()
  .min(2)
  .max(60)
  .label('Level Governmental Support');

const diffRawMaterialValueAProcessedProduct = Joi.string()
  .min(2)
  .max(60)
  .required()
  .label('Difference of Raw Material Value And Processed Product');

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

export const registerThreat = Joi.object().keys({
  effectivenessSanctions,
  impactTariffs,
  levelGovernmentalSupport,
  diffRawMaterialValueAProcessedProduct,
  moreInfo,
  username,
  element
});

export const updateThreat = Joi.object().keys({
  effectivenessSanctions,
  impactTariffs,
  levelGovernmentalSupport,
  diffRawMaterialValueAProcessedProduct,
  moreInfo,
  element
});
