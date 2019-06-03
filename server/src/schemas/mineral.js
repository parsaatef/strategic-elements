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

const alias = Joi.string()
  .min(3)
  .max(30)
  .required()
  .label('Alias');

const elements = Joi.array()
  .items(Joi.string().label('Element'))
  .label('Elements');

const description = Joi.string()
  .empty('')
  .label('Description');

const color = Joi.string().label('Color');
const formula = Joi.string().label('Formula');
const abundance = Joi.string().label('Abundance');

export const registerMineral = Joi.object().keys({
  username,
  title,
  alias,
  elements,
  description,
  color,
  formula,
  abundance
});

export const updateMineral = Joi.object().keys({
  title,
  alias,
  elements,
  description,
  color,
  formula,
  abundance
});
