import Joi from 'joi';

const email = Joi.string()
  .email()
  .required()
  .label('Email');

const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label('Username');

const name = Joi.string()
  .max(254)
  .required()
  .label('Name');

const role = Joi.string()
  .max(40)
  .required()
  .label('Role');

const password = Joi.string()
  .min(8)
  .max(50)
  .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/)
  .required()
  .label('Password')
  .options({
    language: {
      string: {
        regex: {
          base:
            'must have at least one lowercase letter, one uppercase letter, and one digit.'
        }
      }
    }
  });

export const signUp = Joi.object().keys({
  email,
  username,
  name,
  password,
  role
});

export const signIn = Joi.object().keys({
  email,
  password
});

export const updateUser = Joi.object().keys({
  email,
  name,
  password,
  role
});
