import Joi from 'joi';

const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label('Username');

const name = Joi.string()
  .min(3)
  .max(30)
  .required()
  .label('Title');

const element = Joi.string()
  .alphanum()
  .min(2)
  .max(30)
  .required()
  .label('Element');

const value = Joi.number().label('Value');
const year = Joi.number().label('Year');
const unit = Joi.string().label('Unit');

export const registerTotalStats = Joi.object().keys({
  name,
  value,
  year,
  unit,
  username,
  element
});

export const updateTotalStats = Joi.object().keys({
  name,
  value,
  year,
  unit,
  element
});
