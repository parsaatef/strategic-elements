import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { registerOption, updateOption } from '../schemas';
import { Option } from '../models';

export default {
  Query: {
    /**
     * sort can be desc or asc
     * @param root
     * @param args
     * @returns {*}
     */
    searchOptions: (root, args) => {
      const {
        ids,
        name,
        value,
        type,
        users,
        element,
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

      if (element) {
        filters.element = element;
      }

      if (value) {
        filters.value = new RegExp(value, 'i');
      }

      if (type) {
        filters.type = type;
      }

      if (users) {
        filters.username = { $in: users };
      }

      const query = Option.find(filters)
        .sort({ [sortBy]: sort })
        .limit(offset)
        .skip(first);

      return {
        options: query,
        totalCount: Option.count(filters).exec()
      };
    },
    getOption: (root, args) => {
      const { name } = args;

      return Option.findOne({ name });
    },
    option: (root, { id }) => {
      // , context, info
      // TODO: projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid Global Price ID.`);
      }
      return Option.findById(id);
    }
  },
  Mutation: {
    registerOption: async (root, args, { req }) => {
      // , {req}, info
      // TODO: projection
      const newArgs = args;
      newArgs.username = req.currentUser.username;
      await Joi.validate(newArgs, registerOption, { abortEarly: false });

      const element = await Option.create(args);
      console.log('-----element----', element);

      return element;
    },
    updateOption: async (root, { id, ...args }) => {
      await Joi.validate(args, updateOption, { abortEarly: false });

      const result = await Option.updateOne({ _id: id }, args);
      console.log('-----result----', result);

      return {
        result: !!result.ok
      };
    },
    removeOption: async (root, { id }) => {
      const result = await Option.deleteOne({ _id: id });
      console.log('-----result----', result);

      return {
        result: !!result.deletedCount
      };
    },
    multiRemoveOptions: async (root, { ids }) => {
      const result = await Option.deleteMany({ _id: { $in: ids } });
      console.log('-----result----', result);

      return {
        result: result.deletedCount && result.ok
      };
    }
  }
};
