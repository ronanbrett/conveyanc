import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import TheTopNav from "./TheTopNav";
import { Router, Route } from "react-router-dom";

const history = createMemoryHistory({ initialEntries: ["/"] });

const TestComponent = () => (
  <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
    <Route path="/" component={() => <TheTopNav />} />
  </Router>
);

describe("TheTopNav", () => {
  it("renders without error", () => {
    const { asFragment } = render(<TestComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
