import { FieldConfig, useField } from "formik";
import React from "react";
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
