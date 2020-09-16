import React from "react";

import Progress from "./Progress";

import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Progress",
  decorators: [],
  component: Progress,
};

export const Default = (props) => <Progress {...props}></Progress>;

Default.args = {
  size: 50,
  thickness: 7,
  values: [{ value: 25, label: "25%" }],
};
