import * as yup from 'yup';

const schema = yup.object({
  effectivenessSanctions: yup
    .string()
    .min(2)
    .max(60),
  impactTariffs: yup
    .string()
    .min(2)
    .max(60),
  levelGovernmentalSupport: yup
    .string()
    .min(2)
    .max(60),
  diffRawMaterialValueAProcessedProduct: yup
    .string()
    .min(2)
    .max(60)
    .required(),
  moreInfo: yup.string(),
  element: yup
    .string()
    .min(2)
    .max(30)
    .required()
});

export default schema;
