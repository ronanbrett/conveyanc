import { addFieldValidationClasses } from "@core/utils/field.utils";
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
  autocomplete?: string;
  children?: any;
  size?: "large" | "small";
  id?: string;
  placeholder?: string;
  value?: any;
};

const Input = <T extends any>({
  type,
  autocomplete,
  size,
  ...props
}: InputProps<T> & FieldConfig) => {
  const [field, meta, helpers] = useField(props);

  return (
    <input
      className={`Input Input-${size} ${addFieldValidationClasses(meta)}`}
      type={type}
      autoComplete={autocomplete}
      {...field}
      {...props}
    />
  );
};

Input.defaultProps = {
  type: "text",
  autocomplete: "off",
  size: "large",
};

export default Input;
