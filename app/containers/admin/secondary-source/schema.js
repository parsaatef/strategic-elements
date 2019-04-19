import * as yup from 'yup';

const schema = yup.object({
  title: yup
    .string()
    .min(3)
    .max(30)
    .required(),
  element: yup
    .string()
    .min(2)
    .max(30)
    .required(),
  value: yup.number(),
  unit: yup.string(),
  description: yup.string()
});

export default schema;
