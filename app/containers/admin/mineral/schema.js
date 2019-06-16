import * as yup from 'yup';

const schema = yup.object({
  title: yup
    .string()
    .min(3)
    .max(30)
    .required(),
  alias: yup
    .string()
    .min(3)
    .max(30)
    .required(),
  elements: yup
    .array()
    .required()
    .of(yup.string()),
  description: yup.string(),
  color: yup.string(),
  formula: yup.string(),
  abundance: yup.string().required(),
  moreInfo: yup.string()
});

export default schema;
