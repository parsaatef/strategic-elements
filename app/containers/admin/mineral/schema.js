import * as yup from 'yup';

const schema = yup.object({
  title: yup
    .string()
    .min(3)
    .max(30)
    .required(),
  elements: yup.array().of(yup.string()),
  description: yup.string(),
  color: yup.string(),
  formula: yup.string(),
  abundance: yup.string()
});

export default schema;
