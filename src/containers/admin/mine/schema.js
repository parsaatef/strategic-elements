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
    .max(60)
    .required(),
  /* locationType: yup
    .string()
    .required()
    .matches(/(iran|world)/, { excludeEmptyString: true }), */
  mineral: yup
    .string()
    .min(3)
    .max(30),
  description: yup.string(),
  unit: yup.string(),
  impactPreventLocalDeprivation: yup.string(),
  productionValue: yup.number(),
  caratAverage: yup.number(),
  status: yup
    .string()
    .matches(/(active|inactive)/, { excludeEmptyString: true })
});

export default schema;
