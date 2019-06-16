import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { registerEnvironment, updateEnvironment } from '../schemas';
import { Environment } from '../models';

export default {
  Query: {
    /**
     * sort can be desc or asc
     * @param root
     * @param args
     * @returns {*}
     */
    searchEnvironments: (root, args) => {
      const {
        ids,
        waterConsumption,
        energyConsumption,
        greenhouseGasEmissions,
        risksWasteAWasteWater,
        productionProcessRisksHuman,
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

      if (waterConsumption) {
        filters.waterConsumption = waterConsumption;
      }

      if (energyConsumption) {
        filters.energyConsumption = energyConsumption;
      }

      if (greenhouseGasEmissions) {
        filters.greenhouseGasEmissions = greenhouseGasEmissions;
      }

      if (risksWasteAWasteWater) {
        filters.risksWasteAWasteWater = risksWasteAWasteWater;
      }

      if (productionProcessRisksHuman) {
        filters.productionProcessRisksHuman = productionProcessRisksHuman;
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

      let query = Environment.find(filters)
        .sort({ [sortBy]: sort })
        .skip(first);

      if (offset && offset > -1) {
        query = query.limit(offset);
      }

      return {
        environments: query,
        totalCount: Environment.count(filters).exec()
      };
    },
    environments: () => Environment.find({}),
    /* getEnvironment: (root, args) => {
      const { title } = args;

      return Environment.findOne({ title });
    }, */
    environment: (root, { id }) => {
      // , context, info
      // TODO: projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid Global Price ID.`);
      }
      return Environment.findById(id);
    }
  },
  Mutation: {
    registerEnvironment: async (root, args, { req }) => {
      // , {req}, info
      // TODO: projection
      const newArgs = args;
      newArgs.username = req.currentUser.username;
      await Joi.validate(newArgs, registerEnvironment, { abortEarly: false });

      const environment = await Environment.create(args);
      console.log('-----environment----', environment);

      return environment;
    },
    updateEnvironment: async (root, { id, ...args }) => {
      await Joi.validate(args, updateEnvironment, { abortEarly: false });

      const result = await Environment.updateOne({ _id: id }, args);
      console.log('-----result----', result);

      return {
        result: !!result.ok
      };
    },
    removeEnvironment: async (root, { id }) => {
      const result = await Environment.deleteOne({ _id: id });
      console.log('-----result----', result);

      return {
        result: !!result.deletedCount
      };
    },
    multiRemoveEnvironments: async (root, { ids }) => {
      const result = await Environment.deleteMany({ _id: { $in: ids } });
      console.log('-----result----', result);

      return {
        result: result.deletedCount && result.ok
      };
    }
  }
};
