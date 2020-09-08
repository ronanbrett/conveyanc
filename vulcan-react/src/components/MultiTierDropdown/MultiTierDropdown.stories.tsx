import React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";

import {
  MultiTierDropdown,
  MultiTierDropdownItem,
  MultiTierDropdownOption,
} from "./index";

export default {
  title: "Components/MultiTierDropdown",
  decorators: [],
  component: MultiTierDropdown,
};

export const MultiTierDropdownWithField = (props) => (
  <Formik initialValues={{ propertyType: "" }} onSubmit={(x) => console.log(x)}>
    <Form>
      <label htmlFor="propertyType">Property Type</label>
      <Field name="propertyType">
        {() => (
          <MultiTierDropdown
            placeholder="Select Property Type"
            name="propertyType"
          >
            <MultiTierDropdownItem value="Group2" label="test">
              <MultiTierDropdownOption value="TestA">
                Test
              </MultiTierDropdownOption>
            </MultiTierDropdownItem>
            <MultiTierDropdownItem value="Group1" label="test">
              <MultiTierDropdownOption value="TestB">
                Test
              </MultiTierDropdownOption>
              <MultiTierDropdownOption value="TestC">
                Test
              </MultiTierDropdownOption>
              <MultiTierDropdownOption value="TestD">
                Test
              </MultiTierDropdownOption>
            </MultiTierDropdownItem>
            <MultiTierDropdownItem value="Group3" label="test">
              <MultiTierDropdownOption value="TestE">
                Test
              </MultiTierDropdownOption>
              <MultiTierDropdownOption value="TestF">
                Test
              </MultiTierDropdownOption>
            </MultiTierDropdownItem>
          </MultiTierDropdown>
        )}
      </Field>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </Form>
  </Formik>
);

export const MultiTierDropdownWithPresetValue = (props) => (
  <Formik
    initialValues={{ propertyType: "TestC" }}
    onSubmit={(x) => console.log(x)}
  >
    <Form>
      <label htmlFor="propertyType">Property Type</label>
      <Field name="propertyType">
        {({
          field, // { name, value, onChange, onBlur }
          form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <MultiTierDropdown
            placeholder="Select Property Type"
            {...field}
            {...form}
          >
            <MultiTierDropdownItem value="Group2" label="test">
              <MultiTierDropdownOption value="TestA">
                Test
              </MultiTierDropdownOption>
            </MultiTierDropdownItem>
            <MultiTierDropdownItem value="Group1" label="test">
              <MultiTierDropdownOption value="TestB">
                Test
              </MultiTierDropdownOption>
              <MultiTierDropdownOption value="TestC">
                Test
              </MultiTierDropdownOption>
              <MultiTierDropdownOption value="TestD">
                Test
              </MultiTierDropdownOption>
            </MultiTierDropdownItem>
            <MultiTierDropdownItem value="Group3" label="test">
              <MultiTierDropdownOption value="TestE">
                Test
              </MultiTierDropdownOption>
              <MultiTierDropdownOption value="TestF">
                Test
              </MultiTierDropdownOption>
            </MultiTierDropdownItem>
          </MultiTierDropdown>
        )}
      </Field>
      <button type="submit">Submit</button>
    </Form>
  </Formik>
);

export const MultiTierDropDownWithCustomDisplayValue = (props) => {
  const getDisplayValue = (activeItem: string) => {
    return `${activeItem} Transformed`;
  };

  return (
    <Formik
      initialValues={{ propertyType: "" }}
      onSubmit={(x) => console.log(x)}
    >
      <Form>
        <label htmlFor="propertyType">Property Type</label>
        <Field name="propertyType">
          {({
            field, // { name, value, onChange, onBlur }
            form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta,
          }) => (
            <MultiTierDropdown
              placeholder="Select Property Type"
              getDisplayValue={getDisplayValue}
              {...field}
              {...form}
            >
              <MultiTierDropdownItem value="Group2" label="test">
                <MultiTierDropdownOption value="TestA">
                  Test
                </MultiTierDropdownOption>
              </MultiTierDropdownItem>
              <MultiTierDropdownItem value="Group1" label="test">
                <MultiTierDropdownOption value="TestB">
                  Test
                </MultiTierDropdownOption>
                <MultiTierDropdownOption value="TestC">
                  Test
                </MultiTierDropdownOption>
                <MultiTierDropdownOption value="TestD">
                  Test
                </MultiTierDropdownOption>
              </MultiTierDropdownItem>
              <MultiTierDropdownItem value="Group3" label="test">
                <MultiTierDropdownOption value="TestE">
                  Test
                </MultiTierDropdownOption>
                <MultiTierDropdownOption value="TestF">
                  Test
                </MultiTierDropdownOption>
              </MultiTierDropdownItem>
            </MultiTierDropdown>
          )}
        </Field>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
