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

const location = Joi.string()
  .min(2)
  .max(20)
  .required()
  .label('Location');

const locationType = Joi.string()
  .required()
  .valid('iran', 'world')
  .label('Location Type');

const unit = Joi.string().label('Unit');
const productionValue = Joi.number().label('Production Value');
const activeMines = Joi.boolean().label('Active Mines');

export const registerMine = Joi.object().keys({
  title,
  location,
  locationType,
  activeMines,
  productionValue,
  unit,
  description,
  username,
  element
});

export const updateMine = Joi.object().keys({
  title,
  location,
  locationType,
  activeMines,
  productionValue,
  unit,
  description,
  element
});
