import * as yup from 'yup';

type Values = {
  phone: string
}

const phoneRegEx = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

export const getValidationSchema = () => {
  const validationSchema = yup.object<Record<keyof Values, yup.AnySchema>>({
    phone: yup
      .string()
      .required('This field is required')
      .nullable()
      .matches(phoneRegEx, 'Phone number is not valid')
      .min(10)
      .max(10),
  });

  return validationSchema;
};
