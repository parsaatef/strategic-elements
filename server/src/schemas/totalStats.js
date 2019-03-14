import Joi from 'joi';

const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label('Username');

const name = Joi.string()
  .alphanum()
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

const value = Joi.string().label('Value');
const year = Joi.number().label('Year');

export const registerTotalStats = Joi.object().keys({
  name,
  value,
  year,
  username,
  element
});

export const updateTotalStats = Joi.object().keys({
  name,
  value,
  year,
  element
});
