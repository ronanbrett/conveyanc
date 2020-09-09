import React, { FC, SyntheticEvent, useEffect, useState } from "react";

import CharacterInput, { CharacterInputProps } from "./CharacterInput";
import { useField, FieldConfig } from "formik";

const CharacterInputWrapper = ({
  size,
  onChange: onChangeExt,
  ...props
}: Partial<CharacterInputProps> & FieldConfig) => {
  const [field, meta, helpers] = useField(props);

  const onChange = (val: string) => {
    helpers.setValue(val);
  };

  return (
    <CharacterInput
      onUpdate={onChange}
      size={size}
      {...field}
      {...props}
    ></CharacterInput>
  );
};

export default CharacterInputWrapper;
