import React from "react";

import TheTopNav from "./TheTopNav";

import { action } from "@storybook/addon-actions";

export default {
  title: "Components/TheTopNav",
  decorators: [],
  component: TheTopNav,
};

export const Default = () => <TheTopNav></TheTopNav>;
