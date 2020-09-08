import React from "react";

import ListingsView from "./ListingsView";

import { action } from "@storybook/addon-actions";

export default {
  title: "Components/ListingsView",
  decorators: [],
  component: ListingsView,
};

export const Default = () => <ListingsView></ListingsView>;
