import * as yup from 'yup';

const schema = yup.object({
  title: yup
    .string()
    .min(2)
    .max(60)
    .required(),
  element: yup
    .string()
    .min(2)
    .max(30)
    .required(),
  level: yup
    .string()
    .min(2)
    .max(60)
    .required(),
  strategicImportance: yup
    .string()
    .min(2)
    .max(60),

  availabilityInIran: yup
    .string()
    .min(2)
    .max(60)
    .required(),

  description: yup.string()
});

export default schema;
