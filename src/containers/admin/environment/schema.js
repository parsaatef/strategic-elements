import * as yup from 'yup';

const schema = yup.object({
  waterConsumption: yup
    .string()
    .min(2)
    .max(60)
    .required(),
  energyConsumption: yup
    .string()
    .min(2)
    .max(60),
  greenhouseGasEmissions: yup
    .string()
    .min(2)
    .max(60),
  risksWasteAWasteWater: yup
    .string()
    .min(2)
    .max(60)
    .required(),
  productionProcessRisksHuman: yup
    .string()
    .min(2)
    .max(60),
  moreInfo: yup.string(),
  element: yup
    .string()
    .min(2)
    .max(30)
    .required()
});

export default schema;
