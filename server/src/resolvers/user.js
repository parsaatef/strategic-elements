import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { signUp, signIn } from '../schemas';
import { attemptSignIn, signOut } from '../auth';
import { User } from '../models';
import { JWT_SECRET, JWT_EXPIRE } from '../config';

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

export default {
  Query: {
    getCurrentUser: (root, args, { req }) => {
      // , info
      // TODO: projection

      if (!req.currentUser) {
        return null;
      }

      return User.findOne({ email: req.currentUser.email });
    },
    /* users: () => { // root, args, context, info
      // TODO: projection, pagination
      return User.find({})
    }, */
    users: () => User.find({}),
    user: (root, { id }) => {
      // , context, info
      // TODO: projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`);
      }
      return User.findById(id);
    }
  },
  Mutation: {
    signUp: async (root, args) => {
      // , {req}, info
      // TODO: projection
      await Joi.validate(args, signUp, { abortEarly: false });

      const user = await User.create(args);

      return user;
    },
    signIn: async (root, args) => {
      // , {req}, info
      // TODO: projection
      await Joi.validate(args, signIn, { abortEarly: false });

      const user = await attemptSignIn(args.email, args.password);

      return { token: createToken(user, JWT_SECRET, JWT_EXPIRE) };
    },
    /* signOut: (root, args, {req, res}) => {// , info
      return signOut(req, res)
    } */
    signOut: (root, args, { req, res }) => signOut(req, res)
  }
};
