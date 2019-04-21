import * as yup from 'yup';

const schema = yup.object({
  element: yup
    .string()
    .min(2)
    .max(30)
    .required(),
  location: yup
    .string()
    .min(2)
    .max(20)
    .required(),
  locationType: yup
    .string()
    .required()
    .valid('iran', 'world'),
  resourceValue: yup.number(),
  productionValue: yup.number(),
  consumptionValue: yup.number(),
  exportValue: yup.number(),
  importValue: yup.number(),
  secondaryProductionValue: yup.number(),
  mineCount: yup
    .number()
    .min(0)
    .max(100000),
  year: yup
    .number()
    .min(1950)
    .max(2050),
  unit: yup.string(),
  description: yup.string()
});

export default schema;
