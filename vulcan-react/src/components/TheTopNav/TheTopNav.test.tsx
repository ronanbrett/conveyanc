import React from "react";
import { render } from "@testing-library/react";
import TheTopNav from "./TheTopNav";

describe("TheTopNav", () => {
  it("renders without error", () => {
    const { asFragment } = render(<TheTopNav />);
    expect(asFragment()).toMatchSnapshot();
  });
});
