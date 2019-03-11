import Joi from 'joi';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { registerElement, updateElement } from '../schemas';
import { Element } from '../models';

export default {
  Query: {
    /**
     * sort can be desc or asc
     * @param root
     * @param args
     * @returns {*}
     */
    searchElement: (root, args) => {
      const {
        ids,
        elementTitle,
        phaseAtSTP,
        toxicity,
        users,
        magneticProperty,
        electricalConductivity,
        group,
        period,
        sort = 'desc',
        sortBy = 'createdAt'
      } = args;

      const filters = {};

      const id = '_id';

      if (ids) {
        filters[id] = { $in: ids };
      }

      if (elementTitle) {
        filters.elementTitle = `/${elementTitle}/`;
      }

      if (phaseAtSTP) {
        filters.phaseAtSTP = phaseAtSTP;
      }

      if (toxicity) {
        filters.year = toxicity;
      }

      if (magneticProperty) {
        filters.magneticProperty = magneticProperty;
      }

      if (electricalConductivity) {
        filters.electricalConductivity = electricalConductivity;
      }

      if (group) {
        filters.group = group;
      }

      if (period) {
        filters.period = period;
      }

      if (users) {
        filters.username = { $in: users };
      }

      return Element.find(filters).sort({ [sortBy]: sort });
    },
    elements: () => Element.find({}),
    element: (root, { id }) => {
      // , context, info
      // TODO: projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid Element Stats ID.`);
      }
      return Element.findById(id);
    }
  },
  Mutation: {
    registerElement: async (root, args) => {
      // , {req}, info
      // TODO: projection
      await Joi.validate(args, registerElement, { abortEarly: false });

      const element = await Element.create(args);
      console.log('-----element----', element);

      return element;
    },
    updateElement: async (root, { id, ...args }) => {
      await Joi.validate(args, updateElement, { abortEarly: false });

      const result = await Element.updateOne({ _id: id }, args);
      console.log('-----result----', result);

      return {
        result: !!result.ok
      };
    },
    removeElement: async (root, { id }) => {
      const result = await Element.deleteOne({ _id: id });
      console.log('-----result----', result);

      return {
        result: !!result.deletedCount
      };
    },
    multiRemoveElements: async (root, { ids }) => {
      const result = await Element.deleteMany({ _id: { $in: ids } });
      console.log('-----result----', result);

      return {
        result: result.deletedCount && result.ok
      };
    }
  }
};
