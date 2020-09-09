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
import RichTextEditor from "./RichTextEditor";

const RichTextEditorWrapper = <T extends any>({
  size,
  ...props
}: any & FieldConfig) => {
  const [field, meta, helpers] = useField(props);

  const onChange = (value: any) => {
    helpers.setValue(value);
  };

  return (
    <RichTextEditor
      {...field}
      meta={meta}
      {...props}
      onChange={onChange}
    ></RichTextEditor>
  );
};

export default RichTextEditorWrapper;
