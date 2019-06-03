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
  location: yup
    .string()
    .min(2)
    .max(20)
    .required(),
  locationType: yup
    .string()
    .required()
    .matches(/(iran|world)/, { excludeEmptyString: true }),
  description: yup.string(),
  unit: yup.string(),
  productionValue: yup.number(),
  activeMines: yup.bool()
});

export default schema;
