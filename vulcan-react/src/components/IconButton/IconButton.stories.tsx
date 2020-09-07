import React from "react";

import IconButton from "./IconButton";

import { action } from "@storybook/addon-actions";

export default {
  title: "Components/IconButton",
  decorators: [],
  component: IconButton,
  args: {
    icon: "home",
  },
};

export const Default = (props) => <IconButton {...props}></IconButton>;
