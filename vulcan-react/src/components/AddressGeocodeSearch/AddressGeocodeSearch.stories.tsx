import React from "react";

import AddressGeocodeSearch from "./AddressGeocodeSearch";

import { action } from "@storybook/addon-actions";

export default {
  title: "Components/AddressGeocodeSearch",
  decorators: [],
  component: AddressGeocodeSearch,
};

export const Default = (props) => (
  <AddressGeocodeSearch {...props}></AddressGeocodeSearch>
);
