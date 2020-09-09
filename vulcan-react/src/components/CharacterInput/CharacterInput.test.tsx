import React from "react";
import { render } from "@testing-library/react";
import CharacterInput from "./CharacterInput";

describe("CharacterInput", () => {
  it("renders without error", () => {
    const { asFragment } = render(<CharacterInput />);
    expect(asFragment()).toMatchSnapshot();
  });
});
