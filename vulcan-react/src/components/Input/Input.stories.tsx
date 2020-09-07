import React from "react";

import Input from "./Input";

import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Input",
  decorators: [],
  component: Input,
};

export const Default = (props) => <Input {...props}></Input>;
