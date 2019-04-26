import * as yup from 'yup';

const schema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  username: yup
    .string()
    .min(4)
    .max(30)
    .required(),
  role: yup
    .string()
    .max(40)
    .required()
    .matches(/(admin|user)/, { excludeEmptyString: true }),
  password: yup
    .string()
    .min(8)
    .max(50)
    .matches(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/),
  // .required(),
  name: yup
    .string()
    .max(254)
    .required()
});

export default schema;
