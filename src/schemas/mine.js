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
  // .alphanum()
  .min(2)
  .max(30)
  .required()
  .label('Element');

const description = Joi.string()
  .empty('')
  .label('Description');

const location = Joi.string()
  .min(2)
  .max(60)
  .required()
  .label('Location');

const locationType = Joi.string()
  .required()
  .valid('iran', 'world')
  .label('Location Type');

const mineral = Joi.string()
  .empty('')
  .min(3)
  .max(30)
  .label('Mineral');

const status = Joi.string()
  .empty('')
  .valid('active', 'inactive')
  .label('Status');

const caratAverage = Joi.number().label('Carat Average');

const impactPreventLocalDeprivation = Joi.string()
  .empty('')
  .label('Impact Prevent Local Deprivation');

const unit = Joi.string()
  .empty('')
  .label('Unit');
const productionValue = Joi.number().label('Production Value');

export const registerMine = Joi.object().keys({
  title,
  location,
  locationType,
  productionValue,
  unit,
  description,
  username,
  element,
  mineral,
  status,
  caratAverage,
  impactPreventLocalDeprivation
});

export const updateMine = Joi.object().keys({
  title,
  location,
  locationType,
  productionValue,
  unit,
  description,
  element,
  mineral,
  status,
  caratAverage,
  impactPreventLocalDeprivation
});
