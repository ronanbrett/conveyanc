import React, { FC, ReactElement, useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";

export interface WizardProps {
  formRef?: any;
  children?: any;
  initialValues?: any;
  initialStep?: number;
  onSubmit: (values?: any, bag?: any) => void;
}

export const Wizard = <T extends FormikValues>({
  formRef,
  children,
  initialValues,
  initialStep,
  onSubmit,
}: WizardProps) => {
  const [stepNumber, setStepNumber] = useState(initialStep ?? 0);
  const steps = React.Children.toArray(children) as ReactElement[];
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values: any) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values: any) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values: any, bag: any) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <Formik<T>
      innerRef={formRef}
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {(formik) => (
        <Form>
          {/* <p>
            Step {stepNumber + 1} of {totalSteps}
          </p> */}
          {step}
          <div style={{ display: "flex" }}>
            {stepNumber > 0 && (
              <button onClick={() => previous(formik.values)} type="button">
                Back
              </button>
            )}
            <div>
              <button disabled={formik.isSubmitting} type="submit">
                {isLastStep ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const WizardStep = ({
  children,
}: {
  children: any;
  [param: string]: any;
}) => children;
