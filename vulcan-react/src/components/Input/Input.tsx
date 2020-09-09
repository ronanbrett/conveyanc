import { addFieldValidationClasses } from "@core/utils/field.utils";
import TextInput from "components/TextInput";
import {
  FieldConfig,
  FieldInputProps,
  FieldMetaProps,
  FieldProps,
  FormikFormProps,
  useField,
} from "formik";
import React, { FC } from "react";

import "./Input.scss";

type InputTypes =
  | "email"
  | "month"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

type InputProps<T> = {
  type?: InputTypes;
  autoComplete?: string;
  children?: any;
  size?: "large" | "small";
  id?: string;
  placeholder?: string;
  value?: any;
};

const Input = <T extends any>({
  size,
  ...props
}: InputProps<T> & FieldConfig) => {
  const [field, meta, helpers] = useField(props);

  return <TextInput {...field} meta={meta} {...props}></TextInput>;
};

Input.defaultProps = {
  type: "text",
  autoComplete: "off",
  size: "large",
};

export default Input;
