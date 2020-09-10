import React from "react";
import { create } from "react-test-renderer";
import ImageUploader from "./ImageUploader";
import { Formik, Form } from "formik";

describe("ImageUploader", () => {
  it("renders without error", () => {
    const component = create(
      <Formik initialValues={{}} onSubmit={(x) => console.log(x)}>
        <Form>
          <label htmlFor="propertyType">Property Type</label>
          <ImageUploader name="images"></ImageUploader>
        </Form>
      </Formik>
    );

    expect(component).toMatchSnapshot();
  });
});
