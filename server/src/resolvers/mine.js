import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { registerMine, updateMine } from '../schemas';
import { Mine } from '../models';

export default {
  Query: {
    /**
     * sort can be desc or asc
     * @param root
     * @param args
     * @returns {*}
     */
    searchMine: (root, args) => {
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

      return Mine.find(filters).sort({ [sortBy]: sort });
    },
    mines: () => Mine.find({}),
    mine: (root, { id }) => {
      // , context, info
      // TODO: projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid Mine ID.`);
      }
      return Mine.findById(id);
    }
  },
  Mutation: {
    registerMine: async (root, args) => {
      // , {req}, info
      // TODO: projection
      await Joi.validate(args, registerMine, { abortEarly: false });

      const element = await Mine.create(args);
      console.log('-----element----', element);

      return element;
    },
    updateMine: async (root, { id, ...args }) => {
      await Joi.validate(args, updateMine, { abortEarly: false });

      const result = await Mine.updateOne({ _id: id }, args);
      console.log('-----result----', result);

      return {
        result: !!result.ok
      };
    },
    removeMine: async (root, { id }) => {
      const result = await Mine.deleteOne({ _id: id });
      console.log('-----result----', result);

      return {
        result: !!result.deletedCount
      };
    },
    multiRemoveMines: async (root, { ids }) => {
      const result = await Mine.deleteMany({ _id: { $in: ids } });
      console.log('-----result----', result);

      return {
        result: result.deletedCount && result.ok
      };
    }
  }
};
