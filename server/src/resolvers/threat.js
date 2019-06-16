import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { registerThreat, updateThreat } from '../schemas';
import { Threat } from '../models';

export default {
  Query: {
    /**
     * sort can be desc or asc
     * @param root
     * @param args
     * @returns {*}
     */
    searchThreats: (root, args) => {
      const {
        ids,
        effectivenessSanctions,
        impactTariffs,
        levelGovernmentalSupport,
        diffRawMaterialValueAProcessedProduct,
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

      if (effectivenessSanctions) {
        filters.effectivenessSanctions = effectivenessSanctions;
      }

      if (impactTariffs) {
        filters.impactTariffs = impactTariffs;
      }

      if (levelGovernmentalSupport) {
        filters.levelGovernmentalSupport = levelGovernmentalSupport;
      }

      if (diffRawMaterialValueAProcessedProduct) {
        filters.diffRawMaterialValueAProcessedProduct = diffRawMaterialValueAProcessedProduct;
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

      let query = Threat.find(filters)
        .sort({ [sortBy]: sort })
        .skip(first);

      if (offset && offset > -1) {
        query = query.limit(offset);
      }

      return {
        threats: query,
        totalCount: Threat.count(filters).exec()
      };
    },
    threats: () => Threat.find({}),
    /* getThreat: (root, args) => {
      const { title } = args;

      return Threat.findOne({ title });
    }, */
    threat: (root, { id }) => {
      // , context, info
      // TODO: projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid Global Price ID.`);
      }
      return Threat.findById(id);
    }
  },
  Mutation: {
    registerThreat: async (root, args, { req }) => {
      // , {req}, info
      // TODO: projection
      const newArgs = args;
      newArgs.username = req.currentUser.username;
      await Joi.validate(newArgs, registerThreat, { abortEarly: false });

      const threat = await Threat.create(args);
      console.log('-----threat----', threat);

      return threat;
    },
    updateThreat: async (root, { id, ...args }) => {
      await Joi.validate(args, updateThreat, { abortEarly: false });

      const result = await Threat.updateOne({ _id: id }, args);
      console.log('-----result----', result);

      return {
        result: !!result.ok
      };
    },
    removeThreat: async (root, { id }) => {
      const result = await Threat.deleteOne({ _id: id });
      console.log('-----result----', result);

      return {
        result: !!result.deletedCount
      };
    },
    multiRemoveThreats: async (root, { ids }) => {
      const result = await Threat.deleteMany({ _id: { $in: ids } });
      console.log('-----result----', result);

      return {
        result: result.deletedCount && result.ok
      };
    }
  }
};
