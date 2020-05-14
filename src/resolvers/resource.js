import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { registerResource, updateResource } from '../schemas';
import { Resource } from '../models';

export default {
  Query: {
    /**
     * sort can be desc or asc
     * @param root
     * @param args
     * @returns {*}
     */
    searchResource: (root, args) => {
      const {
        ids,
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

      if (description) {
        filters.description = new RegExp(description, 'i');
      }

      if (elements) {
        filters.element = { $in: elements };
      }

      if (users) {
        filters.username = { $in: users };
      }

      let query = Resource.find(filters)
        .sort({ [sortBy]: sort })
        .skip(first);

      if (offset && offset > -1) {
        query = query.limit(offset);
      }

      return {
        resources: query,
        totalCount: Resource.count(filters).exec()
      };
    },
    resources: () => Resource.find({}),
    resource: (root, { id }) => {
      // , context, info
      // TODO: projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid Secondary Source ID.`);
      }
      return Resource.findById(id);
    }
  },
  Mutation: {
    registerResource: async (root, args, { req }) => {
      // , {req}, info
      // TODO: projection
      const newArgs = args;
      newArgs.username = req.currentUser.username;
      await Joi.validate(newArgs, registerResource, {
        abortEarly: false
      });

      const element = await Resource.create(args);
      console.log('-----element----', element);

      return element;
    },
    updateResource: async (root, { id, ...args }) => {
      await Joi.validate(args, updateResource, { abortEarly: false });

      const result = await Resource.updateOne({ _id: id }, args);
      console.log('-----result----', result);

      return {
        result: !!result.ok
      };
    },
    removeResource: async (root, { id }) => {
      const result = await Resource.deleteOne({ _id: id });
      console.log('-----result----', result);

      return {
        result: !!result.deletedCount
      };
    },
    multiRemoveResources: async (root, { ids }) => {
      const result = await Resource.deleteMany({ _id: { $in: ids } });
      console.log('-----result----', result);

      return {
        result: result.deletedCount && result.ok
      };
    }
  }
};
