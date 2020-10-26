import { action } from "@storybook/addon-actions";
import { Field, Form, Formik } from "formik";
import React from "react";

import Input from "./Input";

export default {
  title: "Components/Input",
  decorators: [],
  component: Input,
};

export const Default = ({ type }) => {
  const initialValues = { inputTest: "testing" };
  const onSubmit = (value) => {
    console.log(value);
    action("onSubmit");
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <Input type={type} name="inputTest" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export const WithFormikField = (props) => {
  return <Input {...props}></Input>;
};
