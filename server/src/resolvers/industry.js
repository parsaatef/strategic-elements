import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { registerIndustry, updateIndustry } from '../schemas';
import { Industry } from '../models';

export default {
  Query: {
    /**
     * sort can be desc or asc
     * @param root
     * @param args
     * @returns {*}
     */
    searchIndustries: (root, args) => {
      const {
        ids,
        title,
        type,
        strategicImportance,
        economicSignificance,
        jobCreationRate,
        description,
        moreInfo,
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

      if (type) {
        filters.type = type;
      }

      if (strategicImportance) {
        filters.strategicImportance = strategicImportance;
      }

      if (economicSignificance) {
        filters.economicSignificance = economicSignificance;
      }

      if (jobCreationRate) {
        filters.jobCreationRate = jobCreationRate;
      }

      if (description) {
        filters.description = new RegExp(description, 'i');
      }

      if (moreInfo) {
        filters.moreInfo = new RegExp(moreInfo, 'i');
      }

      if (elements) {
        filters.element = { $in: elements };
      }

      if (users) {
        filters.username = { $in: users };
      }

      let query = Industry.find(filters)
        .sort({ [sortBy]: sort })
        .skip(first);

      if (offset && offset > -1) {
        query = query.limit(offset);
      }

      return {
        industries: query,
        totalCount: Industry.count(filters).exec()
      };
    },
    industries: () => Industry.find({}),
    /* getIndustry: (root, args) => {
      const { title } = args;

      return Industry.findOne({ title });
    }, */
    industry: (root, { id }) => {
      // , context, info
      // TODO: projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid Global Price ID.`);
      }
      return Industry.findById(id);
    }
  },
  Mutation: {
    registerIndustry: async (root, args, { req }) => {
      // , {req}, info
      // TODO: projection
      const newArgs = args;
      newArgs.username = req.currentUser.username;
      await Joi.validate(newArgs, registerIndustry, { abortEarly: false });

      const industry = await Industry.create(args);
      console.log('-----industry----', industry);

      return industry;
    },
    updateIndustry: async (root, { id, ...args }) => {
      await Joi.validate(args, updateIndustry, { abortEarly: false });

      const result = await Industry.updateOne({ _id: id }, args);
      console.log('-----result----', result);

      return {
        result: !!result.ok
      };
    },
    removeIndustry: async (root, { id }) => {
      const result = await Industry.deleteOne({ _id: id });
      console.log('-----result----', result);

      return {
        result: !!result.deletedCount
      };
    },
    multiRemoveIndustries: async (root, { ids }) => {
      const result = await Industry.deleteMany({ _id: { $in: ids } });
      console.log('-----result----', result);

      return {
        result: result.deletedCount && result.ok
      };
    }
  }
};
