import * as yup from 'yup';

const schema = yup.object({
  title: yup
    .string()
    .min(2)
    .max(60)
    .required(),
  type: yup
    .string()
    .required()
    .matches(/(upstream|downstream)/, { excludeEmptyString: true }),
  strategicImportance: yup
    .string()
    .min(2)
    .max(60),
  economicSignificance: yup
    .string()
    .min(2)
    .max(60),
  jobCreationRate: yup
    .string()
    .min(2)
    .max(60),
  description: yup.string(),
  moreInfo: yup.string(),
  element: yup
    .string()
    .min(2)
    .max(30)
    .required()
});

export default schema;
