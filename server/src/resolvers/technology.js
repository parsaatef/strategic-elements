import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { registerTechnology, updateTechnology } from '../schemas';
import { Technology } from '../models';

export default {
  Query: {
    /**
     * sort can be desc or asc
     * @param root
     * @param args
     * @returns {*}
     */
    searchTechnologies: (root, args) => {
      const {
        ids,
        title,
        level,
        strategicImportance,
        economicSignificance,
        rateOfJobCreation,
        AvailabilityInIran,
        description,
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

      if (title) {
        filters.title = new RegExp(title, 'i');
      }

      if (description) {
        filters.description = new RegExp(description, 'i');
      }

      if (element) {
        filters.element = element;
      }

      if (level) {
        filters.level = level;
      }

      if (strategicImportance) {
        filters.strategicImportance = strategicImportance;
      }

      if (economicSignificance) {
        filters.economicSignificance = economicSignificance;
      }

      if (rateOfJobCreation) {
        filters.rateOfJobCreation = rateOfJobCreation;
      }

      if (AvailabilityInIran) {
        filters.AvailabilityInIran = AvailabilityInIran;
      }

      if (users) {
        filters.username = { $in: users };
      }

      let query = Technology.find(filters)
        .sort({ [sortBy]: sort })
        .skip(first);

      if (offset && offset > -1) {
        query = query.limit(offset);
      }

      return {
        options: query,
        totalCount: Technology.count(filters).exec()
      };
    },
    technologies: () => Technology.find({}),
    getTechnology: (root, args) => {
      const { title } = args;

      return Technology.findOne({ title });
    },
    technology: (root, { id }) => {
      // , context, info
      // TODO: projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid Global Price ID.`);
      }
      return Technology.findById(id);
    }
  },
  Mutation: {
    registerTechnology: async (root, args, { req }) => {
      // , {req}, info
      // TODO: projection
      const newArgs = args;
      newArgs.username = req.currentUser.username;
      await Joi.validate(newArgs, registerTechnology, { abortEarly: false });

      const technology = await Technology.create(args);
      console.log('-----technology----', technology);

      return technology;
    },
    updateTechnology: async (root, { id, ...args }) => {
      await Joi.validate(args, updateTechnology, { abortEarly: false });

      const result = await Technology.updateOne({ _id: id }, args);
      console.log('-----result----', result);

      return {
        result: !!result.ok
      };
    },
    removeTechnology: async (root, { id }) => {
      const result = await Technology.deleteOne({ _id: id });
      console.log('-----result----', result);

      return {
        result: !!result.deletedCount
      };
    },
    multiRemoveTechnologies: async (root, { ids }) => {
      const result = await Technology.deleteMany({ _id: { $in: ids } });
      console.log('-----result----', result);

      return {
        result: result.deletedCount && result.ok
      };
    }
  }
};
