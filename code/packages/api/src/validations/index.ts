import * as yup from 'yup';

const textRequired = yup.string().required();
const textOptional = yup.string();

export const validatePostMe = yup.object().shape({
  firstName: textOptional.min(2).max(255),
  lastName: textOptional.min(2).max(255),
  phone: textOptional.min(10).max(15),
});
