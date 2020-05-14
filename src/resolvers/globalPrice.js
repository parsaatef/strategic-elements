import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { registerGlobalPrice, updateGlobalPrice } from '../schemas';
import { GlobalPrice } from '../models';

export default {
  Query: {
    /**
     * sort can be desc or asc
     * @param root
     * @param args
     * @returns {*}
     */
    searchPrice: (root, args) => {
      const {
        ids,
        minPrice,
        maxPrice,
        year,
        elements,
        users,
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

      const price = {};

      if (minPrice) {
        price.$gte = minPrice;
      }

      if (maxPrice) {
        price.$lte = maxPrice;
      }

      if (Object.keys(price).length > 0) {
        filters.price = price;
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

      let query = GlobalPrice.find(filters)
        .sort({ [sortBy]: sort })
        .skip(first);

      if (offset && offset > -1) {
        query = query.limit(offset);
      }

      return {
        globalPrices: query,
        totalCount: GlobalPrice.count(filters).exec()
      };
    },
    globalPrices: () => GlobalPrice.find({}),
    globalPrice: (root, { id }) => {
      // , context, info
      // TODO: projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid Global Price ID.`);
      }
      return GlobalPrice.findById(id);
    }
  },
  Mutation: {
    registerPrice: async (root, args, { req }) => {
      // , {req}, info
      // TODO: projection
      const newArgs = args;
      newArgs.username = req.currentUser.username;
      await Joi.validate(newArgs, registerGlobalPrice, { abortEarly: false });

      const element = await GlobalPrice.create(args);
      console.log('-----element----', element);

      return element;
    },
    updatePrice: async (root, { id, ...args }) => {
      await Joi.validate(args, updateGlobalPrice, { abortEarly: false });

      const result = await GlobalPrice.updateOne({ _id: id }, args);
      console.log('-----result----', result);

      return {
        result: !!result.ok
      };
    },
    removePrice: async (root, { id }) => {
      const result = await GlobalPrice.deleteOne({ _id: id });
      console.log('-----result----', result);

      return {
        result: !!result.deletedCount
      };
    },
    multiRemovePrices: async (root, { ids }) => {
      const result = await GlobalPrice.deleteMany({ _id: { $in: ids } });
      console.log('-----result----', result);

      return {
        result: result.deletedCount && result.ok
      };
    }
  }
};
