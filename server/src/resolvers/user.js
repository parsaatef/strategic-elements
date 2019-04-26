import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { signUp, signIn, updateUser } from '../schemas';
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
    /**
     * sort can be desc or asc
     * @param root
     * @param args
     * @returns {*}
     */
    searchUser: (root, args) => {
      const {
        ids,
        name,
        username,
        role,
        email,
        sort = 'desc',
        sortBy = 'createdAt',
        first = 0,
        offset = 10
      } = args;

      const filters = {};

      const id = '_id';

      if (ids) {
        filters[id] = { $in: ids };
      }

      if (name) {
        filters.name = new RegExp(name, 'i');
      }

      if (username) {
        filters.username = new RegExp(username, 'i');
      }

      if (email) {
        filters.email = new RegExp(email, 'i');
      }

      if (role) {
        filters.role = role;
      }

      const query = User.find(filters)
        .sort({ [sortBy]: sort })
        .limit(offset)
        .skip(first);

      return {
        users: query,
        totalCount: User.count(filters).exec()
      };
    },
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
    updateUser: async (root, { id, ...args }) => {
      await Joi.validate(args, updateUser, { abortEarly: false });

      const result = await User.updateOne({ _id: id }, args);
      console.log('-----result----', result);

      return {
        result: !!result.ok
      };
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
    signOut: (root, args, { req, res }) => signOut(req, res),
    removeUser: async (root, { id }) => {
      const result = await User.deleteOne({ _id: id });
      console.log('-----result----', result);

      return {
        result: !!result.deletedCount
      };
    },
    multiRemoveUsers: async (root, { ids }) => {
      const result = await User.deleteMany({ _id: { $in: ids } });
      console.log('-----result----', result);

      return {
        result: result.deletedCount && result.ok
      };
    }
  }
};
