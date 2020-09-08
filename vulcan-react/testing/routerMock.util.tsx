import React, { Fragment } from "react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

const MockRouter = ({ component }: { component: any }) => (
  <Fragment>
    <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
      <Route path="/" component={() => component()} />
    </Router>
  </Fragment>
);

export default MockRouter;
