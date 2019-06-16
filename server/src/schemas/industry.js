import Joi from 'joi';

const title = Joi.string()
  .min(2)
  .max(60)
  .required()
  .label('Title');

const type = Joi.string()
  .required()
  .valid('upstream', 'downstream')
  .label('Type');

const strategicImportance = Joi.string()
  .min(2)
  .max(60)
  .label('Strategic Importance');

const economicSignificance = Joi.string()
  .min(2)
  .max(60)
  .label('Economic Significance');

const jobCreationRate = Joi.string()
  .min(2)
  .max(60)
  .label('Job Creation Rate');

const description = Joi.string()
  .empty('')
  .label('Description');

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

export const registerIndustry = Joi.object().keys({
  title,
  type,
  strategicImportance,
  economicSignificance,
  jobCreationRate,
  description,
  moreInfo,
  username,
  element
});

export const updateIndustry = Joi.object().keys({
  title,
  type,
  strategicImportance,
  economicSignificance,
  jobCreationRate,
  description,
  moreInfo,
  element
});
