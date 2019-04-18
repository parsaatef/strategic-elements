import * as yup from 'yup';

const schema = yup.object({
  element: yup
    .string()
    .min(2)
    .max(30)
    .required(),
  price: yup.number().required(),
  year: yup.number().required(),
  unit: yup.string(),
  description: yup.string()
});

export default schema;
