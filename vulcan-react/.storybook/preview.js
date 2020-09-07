import React from "react";
import { GlobalStyleProvider } from "../src/core/theme/light.theme";

import "../src/styles/styles.scss";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <GlobalStyleProvider>
      <Story />
    </GlobalStyleProvider>
  ),
];
