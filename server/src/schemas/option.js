import Joi from 'joi';

const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label('Username');

const name = Joi.string()
  .alphanum()
  .min(2)
  .max(60)
  .required()
  .label('Name');

const type = Joi.string()
  .alphanum()
  .min(2)
  .max(20)
  .required()
  .label('Name');

const value = Joi.string().label('Value');

export const registerOption = Joi.object().keys({
  name,
  value,
  type,
  username
});

export const updateOption = Joi.object().keys({
  name,
  value,
  type
});
