import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import {
  registerInternationalRelation,
  updateInternationalRelation
} from '../schemas';
import { InternationalRelation } from '../models';

export default {
  Query: {
    /**
     * sort can be desc or asc
     * @param root
     * @param args
     * @returns {*}
     */
    searchInternationalRelations: (root, args) => {
      const {
        ids,
        country,
        relationLevel,
        moreInfo,
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

      if (country) {
        filters.country = country;
      }

      if (relationLevel) {
        filters.relationLevel = relationLevel;
      }

      if (moreInfo) {
        filters.moreInfo = new RegExp(moreInfo, 'i');
      }

      if (users) {
        filters.username = { $in: users };
      }

      let query = InternationalRelation.find(filters)
        .sort({ [sortBy]: sort })
        .skip(first);

      if (offset && offset > -1) {
        query = query.limit(offset);
      }

      return {
        internationalRelations: query,
        totalCount: InternationalRelation.count(filters).exec()
      };
    },
    internationalRelations: () => InternationalRelation.find({}),
    /* getInternationalRelation: (root, args) => {
      const { title } = args;

      return InternationalRelation.findOne({ title });
    }, */
    internationalRelation: (root, { id }) => {
      // , context, info
      // TODO: projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid Global Price ID.`);
      }
      return InternationalRelation.findById(id);
    }
  },
  Mutation: {
    registerInternationalRelation: async (root, args, { req }) => {
      // , {req}, info
      // TODO: projection
      const newArgs = args;
      newArgs.username = req.currentUser.username;
      await Joi.validate(newArgs, registerInternationalRelation, {
        abortEarly: false
      });

      const internationalRelation = await InternationalRelation.create(args);
      console.log('-----internationalRelation----', internationalRelation);

      return internationalRelation;
    },
    updateInternationalRelation: async (root, { id, ...args }) => {
      await Joi.validate(args, updateInternationalRelation, {
        abortEarly: false
      });

      const result = await InternationalRelation.updateOne({ _id: id }, args);
      console.log('-----result----', result);

      return {
        result: !!result.ok
      };
    },
    removeInternationalRelation: async (root, { id }) => {
      const result = await InternationalRelation.deleteOne({ _id: id });
      console.log('-----result----', result);

      return {
        result: !!result.deletedCount
      };
    },
    multiRemoveInternationalRelations: async (root, { ids }) => {
      const result = await InternationalRelation.deleteMany({
        _id: { $in: ids }
      });
      console.log('-----result----', result);

      return {
        result: result.deletedCount && result.ok
      };
    }
  }
};
