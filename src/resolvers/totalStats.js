import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { registerTotalStats, updateTotalStats } from '../schemas';
import { TotalStats } from '../models';

export default {
  Query: {
    /**
     * sort can be desc or asc
     * @param root
     * @param args
     * @returns {*}
     */
    searchTotalStats: (root, args) => {
      const {
        ids,
        name,
        year,
        users,
        elements,
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

      if (year) {
        filters.year = year;
      }

      if (elements) {
        filters.element = { $in: elements };
      }

      if (users) {
        filters.username = { $in: users };
      }

      let query = TotalStats.find(filters)
        .sort({ [sortBy]: sort })
        .skip(first);

      if (offset && offset > -1) {
        query = query.limit(offset);
      }

      return {
        totalStatsList: query,
        totalCount: TotalStats.count(filters).exec()
      };
    },
    totalStatsList: () => TotalStats.find({}),
    totalStats: (root, { id }) => {
      // , context, info
      // TODO: projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid Total Stats ID.`);
      }
      return TotalStats.findById(id);
    }
  },
  Mutation: {
    registerTotalStats: async (root, args, { req }) => {
      // , {req}, info
      // TODO: projection
      const newArgs = args;
      newArgs.username = req.currentUser.username;
      await Joi.validate(newArgs, registerTotalStats, { abortEarly: false });

      const element = await TotalStats.create(args);
      console.log('-----element----', element);

      return element;
    },
    updateTotalStats: async (root, { id, ...args }) => {
      await Joi.validate(args, updateTotalStats, { abortEarly: false });

      const result = await TotalStats.updateOne({ _id: id }, args);
      console.log('-----result----', result);

      return {
        result: !!result.ok
      };
    },
    removeTotalStats: async (root, { id }) => {
      const result = await TotalStats.deleteOne({ _id: id });
      console.log('-----result----', result);

      return {
        result: !!result.deletedCount
      };
    },
    multiRemoveTotalStats: async (root, { ids }) => {
      const result = await TotalStats.deleteMany({ _id: { $in: ids } });
      console.log('-----result----', result);

      return {
        result: result.deletedCount && result.ok
      };
    }
  }
};
