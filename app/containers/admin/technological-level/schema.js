import * as yup from 'yup';

const schema = yup.object({
  name: yup
    .string()
    .min(2)
    .max(60)
    .required(),
  type: yup
    .string()
    .min(2)
    .max(20)
    .required(),
  value: yup.string()
});

export default schema;
