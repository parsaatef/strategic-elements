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

const primarySource = Joi.number().label('Primary Source');

const location = Joi.string()
  .required()
  .label('Location');

const secondarySource = Joi.string()
  .empty('')
  .label('Secondary Source');

const unit = Joi.string()
  .empty('')
  .label('Unit');

const description = Joi.string()
  .empty('')
  .label('Description');

const moreInfo = Joi.string()
  .empty('')
  .label('More Info');

export const registerResource = Joi.object().keys({
  primarySource,
  location,
  secondarySource,
  moreInfo,
  unit,
  description,
  username,
  element
});

export const updateResource = Joi.object().keys({
  primarySource,
  location,
  secondarySource,
  moreInfo,
  unit,
  description,
  element
});
