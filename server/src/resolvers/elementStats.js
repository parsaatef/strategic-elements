import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { registerElementStats, updateElementStats } from '../schemas';
import { ElementStats } from '../models';

export default {
  Query: {
    statsByElement: (root, args, { req }) => {
      // , info
      // TODO: projection
      let filters = { element: args.element };
      if (req.filters) {
        filters = { ...req.filters, element: args.element };
      }
      return ElementStats.findOne(filters);
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

      return elementStats;
    },
    updateElementStats: async (root, { id, ...args }) => {
      await Joi.validate(args, updateElementStats, { abortEarly: false });

      const elementStats = await ElementStats.updateOne(
        { id },
        { $set: { args } }
      );

      return elementStats;
    }
  }
};
