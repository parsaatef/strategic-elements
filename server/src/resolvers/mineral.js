import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { registerMineral, updateMineral } from '../schemas';
import { Mineral } from '../models';

export default {
  Query: {
    /**
     * sort can be desc or asc
     * @param root
     * @param args
     * @returns {*}
     */
    searchMineral: (root, args) => {
      const {
        ids,
        title,
        description,
        color,
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

      if (color) {
        filters.color = color;
      }

      if (elements) {
        filters.element = { $in: elements };
      }

      if (users) {
        filters.username = { $in: users };
      }

      return Mineral.find(filters).sort({ [sortBy]: sort });
    },
    minerals: () => Mineral.find({}),
    mineral: (root, { id }) => {
      // , context, info
      // TODO: projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid Mineral ID.`);
      }
      return Mineral.findById(id);
    }
  },
  Mutation: {
    registerMineral: async (root, args) => {
      // , {req}, info
      // TODO: projection
      await Joi.validate(args, registerMineral, { abortEarly: false });

      const element = await Mineral.create(args);
      console.log('-----element----', element);

      return element;
    },
    updateMineral: async (root, { id, ...args }) => {
      await Joi.validate(args, updateMineral, { abortEarly: false });

      const result = await Mineral.updateOne({ _id: id }, args);
      console.log('-----result----', result);

      return {
        result: !!result.ok
      };
    },
    removeMineral: async (root, { id }) => {
      const result = await Mineral.deleteOne({ _id: id });
      console.log('-----result----', result);

      return {
        result: !!result.deletedCount
      };
    },
    multiRemoveMinerals: async (root, { ids }) => {
      const result = await Mineral.deleteMany({ _id: { $in: ids } });
      console.log('-----result----', result);

      return {
        result: result.deletedCount && result.ok
      };
    }
  }
};
