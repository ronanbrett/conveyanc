import { render } from "@testing-library/react";
import { MockRouter, createTopNavPortalMock } from "testing";
import React from "react";
import ListingsCreateView from "./ListingsCreateView";

createTopNavPortalMock();

const TestViewComponent = () => <MockRouter component={ListingsCreateView} />;

describe("ListingsCreateView", () => {
  it("renders without error", () => {
    const { asFragment } = render(<TestViewComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
