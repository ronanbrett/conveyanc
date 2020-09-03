import React from "react";

import Home from "./Home";

import { action } from "@storybook/addon-actions";

export default {
  title: "Pages/Home",
  decorators: [],
  component: Home,
};

export const Default = () => <Home></Home>;
