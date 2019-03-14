import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { registerSecondarySource, updateSecondarySource } from '../schemas';
import { SecondarySource } from '../models';

export default {
  Query: {
    /**
     * sort can be desc or asc
     * @param root
     * @param args
     * @returns {*}
     */
    searchSecondarySource: (root, args) => {
      const {
        ids,
        title,
        description,
        users,
        elements,
        sort = 'desc',
        sortBy = 'createdAt'
      } = args;

      const filters = {};

      const id = '_id';

      if (ids) {
        filters[id] = { $in: ids };
      }

      if (title) {
        filters.title = `/${title}/`;
      }

      if (description) {
        filters.description = `/${description}/`;
      }

      if (elements) {
        filters.element = { $in: elements };
      }

      if (users) {
        filters.username = { $in: users };
      }

      return SecondarySource.find(filters).sort({ [sortBy]: sort });
    },
    minerals: () => SecondarySource.find({}),
    mineral: (root, { id }) => {
      // , context, info
      // TODO: projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid Secondary Source ID.`);
      }
      return SecondarySource.findById(id);
    }
  },
  Mutation: {
    registerSecondarySource: async (root, args) => {
      // , {req}, info
      // TODO: projection
      await Joi.validate(args, registerSecondarySource, { abortEarly: false });

      const element = await SecondarySource.create(args);
      console.log('-----element----', element);

      return element;
    },
    updateSecondarySource: async (root, { id, ...args }) => {
      await Joi.validate(args, updateSecondarySource, { abortEarly: false });

      const result = await SecondarySource.updateOne({ _id: id }, args);
      console.log('-----result----', result);

      return {
        result: !!result.ok
      };
    },
    removeSecondarySource: async (root, { id }) => {
      const result = await SecondarySource.deleteOne({ _id: id });
      console.log('-----result----', result);

      return {
        result: !!result.deletedCount
      };
    },
    multiRemoveSecondarySources: async (root, { ids }) => {
      const result = await SecondarySource.deleteMany({ _id: { $in: ids } });
      console.log('-----result----', result);

      return {
        result: result.deletedCount && result.ok
      };
    }
  }
};
