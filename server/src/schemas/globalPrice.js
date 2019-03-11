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

const price = Joi.number()
  .required()
  .label('Price');

const year = Joi.number()
  .required()
  .label('Year');

const unit = Joi.string().label('Unit');

const description = Joi.string()
  .empty('')
  .label('Description');

export const registerGlobalPrice = Joi.object().keys({
  price,
  year,
  unit,
  description,
  username,
  element
});

export const updateGlobalPrice = Joi.object().keys({
  price,
  year,
  unit,
  description,
  username,
  element
});
