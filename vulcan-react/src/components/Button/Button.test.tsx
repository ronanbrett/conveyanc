import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Button", () => {
  it("renders without error", () => {
    const { asFragment } = render(<Button />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should be compliant", async () => {
    const { container } = render(<Button />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should be able to trigger change events", () => {
    const mockCallBack = jest.fn();

    const { container } = render(<Button onClick={mockCallBack} />);
    container.querySelector("button").click();
    expect(mockCallBack).toHaveBeenCalled();
  });

  it("should set hover on hover", () => {
    const { container } = render(<Button />);
    let button = container.querySelector("button");

    fireEvent.mouseOver(button);

    expect(button).toHaveClass("hover");
  });

  it("should set focus on hover", () => {
    const { container } = render(<Button />);
    let button = container.querySelector("button");

    fireEvent.focus(button);

    expect(button).toHaveClass("focus");
  });

  it("should not emit events if its disabled", () => {
    const mockCallBack = jest.fn();

    const { container } = render(<Button onClick={mockCallBack} disabled />);
    let button = container.querySelector("button");

    fireEvent.click(button);

    expect(mockCallBack).not.toHaveBeenCalled();
  });
});
