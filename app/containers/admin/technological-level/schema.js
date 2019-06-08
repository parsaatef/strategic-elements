import * as yup from 'yup';

const schema = yup.object({
  name: yup
    .string()
    .min(2)
    .max(60)
    .required(),
  element: yup
    .string()
    .min(2)
    .max(30)
    .required(),
  value: yup.string(),
  level: yup
    .string()
    .min(2)
    .max(60)
    .required(),
  strategicImportance: yup
    .string()
    .min(2)
    .max(60),

  economicSignificance: yup
    .string()
    .min(2)
    .max(60),

  rateOfJobCreation: yup
    .string()
    .min(2)
    .max(60),

  AvailabilityInIran: yup
    .string()
    .min(2)
    .max(60),

  description: yup.string()
});

export default schema;
