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
  .required()
  .label('Elements');

const description = Joi.string()
  .empty('')
  .label('Description');

const color = Joi.string()
  .empty('')
  .label('Color');

const formula = Joi.string()
  .empty('')
  .label('Formula');

const abundance = Joi.string()
  .required()
  .label('Abundance');

const moreInfo = Joi.string()
  .empty('')
  .label('More Info');

export const registerMineral = Joi.object().keys({
  username,
  title,
  alias,
  elements,
  description,
  moreInfo,
  color,
  formula,
  abundance
});

export const updateMineral = Joi.object().keys({
  title,
  alias,
  elements,
  description,
  moreInfo,
  color,
  formula,
  abundance
});
