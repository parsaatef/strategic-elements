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

const title = Joi.string()
  .min(2)
  .max(60)
  .required()
  .label('Title');

const level = Joi.string()
  .min(2)
  .max(60)
  .required()
  .label('Level');

const strategicImportance = Joi.string()
  .min(2)
  .max(60)
  .required()
  .label('Strategic Importance');

const availabilityInIran = Joi.string()
  .min(2)
  .max(60)
  .required()
  .label('Availability In Iran');

const description = Joi.string()
  .empty('')
  .label('Description');

export const registerTechnology = Joi.object().keys({
  title,
  level,
  strategicImportance,
  availabilityInIran,
  description,
  element,
  username
});

export const updateTechnology = Joi.object().keys({
  title,
  level,
  strategicImportance,
  availabilityInIran,
  description,
  element
});
