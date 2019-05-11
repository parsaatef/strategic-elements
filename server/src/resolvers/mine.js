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
        sortBy = 'createdAt',
        first = 0,
        offset = 10
      } = args;

      const filters = {};

      const id = '_id';

      if (ids) {
        filters[id] = { $in: ids };
      }

      if (title) {
        filters.title = new RegExp(title, 'i');
      }

      if (description) {
        filters.description = new RegExp(description, 'i');
      }

      if (elements) {
        filters.element = { $in: elements };
      }

      if (users) {
        filters.username = { $in: users };
      }

      let query = Mine.find(filters)
        .sort({ [sortBy]: sort })
        .skip(first);

      if (offset && offset > -1) {
        query = query.limit(offset);
      }

      return {
        mines: query,
        totalCount: Mine.count(filters).exec()
      };
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
    registerMine: async (root, args, { req }) => {
      // , {req}, info
      // TODO: projection
      const newArgs = args;
      newArgs.username = req.currentUser.username;
      await Joi.validate(newArgs, registerMine, { abortEarly: false });

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
