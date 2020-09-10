import React from "react";
import { render } from "@testing-library/react";
import ListingCreateForm from "./ListingCreateForm";
import { create } from "react-test-renderer";

const generatePortal = () => {
  let modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "topNavPortal");
  document.querySelector("body")!.appendChild(modalRoot);
};

describe("ListingCreateForm", () => {
  beforeAll(() => {
    generatePortal();
    window.getSelection = () => {
      return {} as any;
    };
  });
  it("renders without error", () => {
    const { container } = render(<ListingCreateForm />);
    expect(container).toMatchSnapshot();
  });
});
