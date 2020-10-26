import { Field, Form, Formik } from "formik";
import React from "react";

export const WithFormikWrapper = ({
  initialValues,
  onSubmit,
  children,
}: {
  initialValues: any;
  onSubmit: () => void;
  children: any;
}) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit}>
    <Form>{children}</Form>
  </Formik>
);
