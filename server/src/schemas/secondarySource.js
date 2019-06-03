import Joi from 'joi';

const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label('Username');

const title = Joi.string()
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

const description = Joi.string()
  .empty('')
  .label('Description');

const unit = Joi.string().label('Unit');
const value = Joi.string().label('Value');

export const registerSecondarySource = Joi.object().keys({
  title,
  value,
  unit,
  description,
  username,
  element
});

export const updateSecondarySource = Joi.object().keys({
  title,
  value,
  unit,
  description,
  element
});
