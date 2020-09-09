import React from "react";

import Keyboard from "./Keyboard";

import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Keyboard",
  decorators: [],
  component: Keyboard,
  argTypes: { onEsc: { action: "clicked" } },
};

export const Default = (props) => (
  <Keyboard>
    <input type="text" />
  </Keyboard>
);
