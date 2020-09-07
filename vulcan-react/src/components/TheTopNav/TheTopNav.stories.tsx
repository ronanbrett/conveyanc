import React from "react";

import TheTopNav from "./TheTopNav";
import { createMemoryHistory } from "history";
import { action } from "@storybook/addon-actions";
import { Router, Route } from "react-router-dom";

const history = createMemoryHistory({ initialEntries: ["/"] });

export default {
  title: "Components/TheTopNav",
  decorators: [
    (story) => (
      <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
        <Route path="/" component={() => story()} />
      </Router>
    ),
  ],
  component: TheTopNav,
};

export const Default = () => <TheTopNav></TheTopNav>;
