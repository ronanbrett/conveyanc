import React from "react";
import { render } from "@testing-library/react";
import ListingsView from "./ListingsView";
import { MockRouter, createTopNavPortalMock } from "testing";

createTopNavPortalMock();
const TestViewComponent = () => <MockRouter component={ListingsView} />;

describe("ListingsView", () => {
  it("renders without error", () => {
    const { asFragment } = render(<TestViewComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
