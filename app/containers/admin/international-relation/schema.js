import * as yup from 'yup';

const schema = yup.object({
  country: yup
    .string()
    .min(2)
    .max(60)
    .required(),
  relationLevel: yup
    .string()
    .min(2)
    .max(60)
    .required(),
  moreInfo: yup.string()
});

export default schema;
