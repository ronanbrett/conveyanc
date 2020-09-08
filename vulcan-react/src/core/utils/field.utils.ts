import { FieldMetaProps } from "formik";

export const addFieldValidationClasses = (
  formikMeta: Partial<FieldMetaProps<any>>
) => {
  return `${
    formikMeta.error && formikMeta.touched ? "field--invalid" : "field--valid"
  }`;
};
