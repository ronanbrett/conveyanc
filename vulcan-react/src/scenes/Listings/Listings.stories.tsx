import React from "react";

import Listings from "./Listings";

import { action } from "@storybook/addon-actions";

export default {
  title: "Pages/Listings",
  decorators: [],
  component: Listings,
};

export const Default = () => <Listings routes={[]}></Listings>;
