import React from "react";

import UploadCheckbox from "./UploadCheckbox";

import { action } from "@storybook/addon-actions";
import { Form, Formik } from "formik";

export default {
  title: "Components/UploadCheckbox",
  decorators: [],
  component: UploadCheckbox,
};

export const Default = (props) => (
  <Formik initialValues={{}} onSubmit={() => {}}>
    <Form>
      <UploadCheckbox {...props}></UploadCheckbox>
    </Form>
  </Formik>
);

Default.args = {
  title: "Title Deeds",
  subtitle:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, ex fugit unde ad facilis quae asperiores libero vel maiores quibusdam quos corrupti nesciunt debitis in iure assumenda odit earum! Omnis?",
};
