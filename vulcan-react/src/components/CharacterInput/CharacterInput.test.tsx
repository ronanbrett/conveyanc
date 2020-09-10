import React from "react";
import { create } from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";
import CharacterInput from "./CharacterInput";
import { Formik, Form } from "formik";
import CharacterInputWrapper from "./CharacterInputWrapper";

describe("CharacterInput", () => {
  it("renders without error", () => {
    const component = create(
      <Formik initialValues={{}} onSubmit={(x) => console.log(x)}>
        <Form>
          <label htmlFor="propertyType">Property Type</label>
          <CharacterInput size={4}></CharacterInput>
        </Form>
      </Formik>
    );

    expect(component).toMatchSnapshot();
  });

  describe("for the CharacterInput dom", () => {
    it("should render a series of input", () => {
      let { container } = render(
        <Formik initialValues={{ test: "" }} onSubmit={(x) => console.log(x)}>
          <Form>
            <label htmlFor="propertyType">Property Type</label>
            <CharacterInputWrapper name="test" size={4}></CharacterInputWrapper>
          </Form>
        </Formik>
      );
      const inputs = container.querySelectorAll("input");
      expect(inputs.length).toBe(4);
    });

    it("should update the form", () => {
      const mockCallback = jest.fn();
      let { container } = render(
        <Formik initialValues={{ test: "" }} onSubmit={mockCallback}>
          <Form>
            <label htmlFor="propertyType">Property Type</label>
            <CharacterInputWrapper name="test" size={4}></CharacterInputWrapper>
          </Form>
        </Formik>
      );

      expect(mockCallback).not.toBeCalled();
      const inputs = container.querySelectorAll("input");
      expect(inputs.length).toBe(4);
      inputs[0].value = "A";
      fireEvent.change(inputs[0]);
    });
  });
});
