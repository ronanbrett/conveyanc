import React from "react";
import { render } from "@testing-library/react";
import {
  MultiTierDropdown,
  MultiTierDropdownOption,
  MultiTierDropdownItem,
} from "./index";
import { Field, Form, Formik } from "formik";
import { create } from "react-test-renderer";

const TestComponent = () => {
  return (
    <Formik initialValues={{ propertyType: "" }} onSubmit={(x) => console.log(x)}>
      <Form>
        <label htmlFor="propertyType">Property Type</label>
        <Field name="propertyType">
        {() => (
          <MultiTierDropdown name="propertyType" placeholder="Select Property Type">
            <MultiTierDropdownItem value="Group2" label="test">
              <MultiTierDropdownOption value="TestA">Test</MultiTierDropdownOption>
            </MultiTierDropdownItem>
            <MultiTierDropdownItem value="Group1" label="test">
              <MultiTierDropdownOption value="TestB">Test</MultiTierDropdownOption>
              <MultiTierDropdownOption value="TestC">Test</MultiTierDropdownOption>
              <MultiTierDropdownOption value="TestD">Test</MultiTierDropdownOption>
            </MultiTierDropdownItem>
            <MultiTierDropdownItem value="Group3" label="test">
              <MultiTierDropdownOption value="TestE">Test</MultiTierDropdownOption>
              <MultiTierDropdownOption value="TestF">Test</MultiTierDropdownOption>
            </MultiTierDropdownItem>
          </MultiTierDropdown>
        )}
        </Field>
      </Form>
    </Formik>
  );
};

describe("MultiTierDropdown", () => {
  it("renders without error", () => {
    const component = create(<TestComponent />);
    expect(component).toMatchSnapshot();
  });
});
