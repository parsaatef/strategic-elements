import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { registerElementStats, updateElementStats } from '../schemas';
import { ElementStats } from '../models';

export default {
  Query: {
    /**
     * sort can be desc or asc
     * @param root
     * @param args
     * @returns {*}
     */
    searchElementStats: (root, args) => {
      const {
        ids,
        location,
        locationType,
        year,
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

      if (location) {
        filters.location = location;
      }

      if (locationType) {
        filters.locationType = locationType;
      }

      if (year) {
        filters.year = year;
      }

      if (users) {
        filters.username = { $in: users };
      }

      if (elements) {
        filters.element = { $in: elements };
      }

      return ElementStats.find(filters).sort({ [sortBy]: sort });
    },
    elementsStats: () => ElementStats.find({}),
    elementStats: (root, { id }) => {
      // , context, info
      // TODO: projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid Element Stats ID.`);
      }
      return ElementStats.findById(id);
    }
  },
  Mutation: {
    registerElementStats: async (root, args) => {
      // , {req}, info
      // TODO: projection
      await Joi.validate(args, registerElementStats, { abortEarly: false });

      const elementStats = await ElementStats.create(args);
      console.log('-----elementStats----', elementStats);

      return elementStats;
    },
    updateElementStats: async (root, { id, ...args }) => {
      await Joi.validate(args, updateElementStats, { abortEarly: false });

      const result = await ElementStats.updateOne({ _id: id }, args);
      console.log('-----result----', result);

      return {
        result: !!result.ok
      };
    },
    removeElementStats: async (root, { id }) => {
      const result = await ElementStats.deleteOne({ _id: id });
      console.log('-----result----', result);

      return {
        result: !!result.deletedCount
      };
    },
    multiRemoveElementStats: async (root, { ids }) => {
      const result = await ElementStats.deleteOne({ _id: { $in: ids } });
      console.log('-----result----', result);

      return {
        result: result.deletedCount && result.ok
      };
    }
  }
};
