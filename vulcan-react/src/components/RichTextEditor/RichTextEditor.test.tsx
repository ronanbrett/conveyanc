import React from "react";
import { create } from "react-test-renderer";
import RichTextEditorWrapper from "./RichTextEditorWrapper";
import { Formik, Form } from "formik";
import ImageUploader from "components/ImageUploader";

describe("RichTextEditor", () => {
  beforeAll(() => {
    window.getSelection = () => {
      return {} as any;
    };
  });
  it("renders without error", () => {
    const component = create(
      <Formik initialValues={{}} onSubmit={(x) => console.log(x)}>
        <Form>
          <label htmlFor="propertyType">Property Type</label>
          <RichTextEditorWrapper />
        </Form>
      </Formik>
    );
    expect(component).toMatchSnapshot();
  });
});
