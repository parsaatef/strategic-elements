import * as yup from 'yup';

const schema = yup.object({
  name: yup
    .string()
    .min(3)
    .max(30)
    .required(),
  element: yup
    .string()
    .min(2)
    .max(30)
    .required(),
  value: yup.string(),
  unit: yup.string(),
  year: yup.number()
});

export default schema;
