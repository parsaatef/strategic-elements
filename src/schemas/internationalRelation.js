import Joi from 'joi';

const country = Joi.string()
  .min(2)
  .max(60)
  .required()
  .label('Country');

const relationLevel = Joi.string()
  .min(2)
  .max(60)
  .required()
  .label('Relation Level');

const moreInfo = Joi.string()
  .empty('')
  .label('More Info');

const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label('Username');

export const registerInternationalRelation = Joi.object().keys({
  country,
  relationLevel,
  moreInfo,
  username
});

export const updateInternationalRelation = Joi.object().keys({
  country,
  relationLevel,
  moreInfo
});
