import * as yup from 'yup';

const schema = yup.object({
  element: yup
    .string()
    .min(2)
    .max(30)
    .required(),
  primarySource: yup.number(),
  location: yup.string().required(),
  secondarySource: yup.string(),
  unit: yup.string(),
  description: yup.string(),
  moreInfo: yup.string()
});

export default schema;
