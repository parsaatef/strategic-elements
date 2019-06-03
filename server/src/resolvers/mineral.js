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
        alias,
        description,
        color,
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

      if (alias) {
        filters.alias = new RegExp(alias, 'i');
      }

      if (description) {
        filters.description = new RegExp(description, 'i');
      }

      if (color) {
        filters.color = new RegExp(color, 'i');
      }

      /**
       * TODO: need to change and fix
       */
      if (elements) {
        filters.elements = { $in: elements };
      }

      if (users) {
        filters.username = { $in: users };
      }

      console.log('---------is Valid----------');

      let query = Mineral.find(filters)
        .sort({ [sortBy]: sort })
        .skip(first);

      if (offset && offset > -1) {
        query = query.limit(offset);
      }

      return {
        minerals: query,
        totalCount: Mineral.count(filters).exec()
      };
    },
    minerals: () => Mineral.find({}),
    mineral: (root, { id }) => {
      // , context, info
      // TODO: projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid Mineral ID.`);
      }
      console.log('---------is Valid----------', Mineral.findById(id));
      return Mineral.findById(id);
    }
  },
  Mutation: {
    registerMineral: async (root, args, { req }) => {
      // , {req}, info
      // TODO: projection
      const newArgs = args;
      newArgs.username = req.currentUser.username;
      await Joi.validate(newArgs, registerMineral, { abortEarly: false });

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
