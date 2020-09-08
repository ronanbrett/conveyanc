import React from "react";

import Input from "./Input";

export default {
  title: "Components/Input",
  decorators: [],
  component: Input,
};

export const Default = (props) => <Input {...props}></Input>;

export const WithFormikField = (props) => {
  return <Input {...props}></Input>;
};
