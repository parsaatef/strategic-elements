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
  locationType: 'world',
  year: yup
    .number()
    .min(1950)
    .max(2050),
  consumptionValue: yup.number(),
  unit: yup.string(),
  description: yup.string()
});

export default schema;
