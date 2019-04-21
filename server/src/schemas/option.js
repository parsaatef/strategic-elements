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

const name = Joi.string()
  .min(2)
  .max(60)
  .required()
  .label('Name');

const type = Joi.string()
  .min(2)
  .max(40)
  .required()
  .label('Type');

const value = Joi.string().label('Value');

export const registerOption = Joi.object().keys({
  name,
  value,
  type,
  element,
  username
});

export const updateOption = Joi.object().keys({
  name,
  value,
  type,
  element
});
