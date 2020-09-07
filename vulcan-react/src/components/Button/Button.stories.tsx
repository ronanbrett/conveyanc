import React from "react";

import Button from "./Button";

import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Button",
  decorators: [],
  component: Button,
};

export const Default = (props) => <Button {...props}>I am a Button</Button>;
