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
  value: yup.string()
});

export default schema;
