import {
  Input,
  MultiTierDropdown,
  MultiTierDropdownItem,
  MultiTierDropdownOption,
} from "@components";
import { PropertyInfo } from "@core/api/graphql";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { groupBy } from "lodash-es";
import React, { FC, ReactElement } from "react";
import styles from "./ListingCreateForm.module.scss";

import { object, string } from "yup";

const ListingCreateFormSchema = object().shape({
  propertyType: string().required("You must select a type"),
  name: string().required("You must add a name"),
});

interface ListingCreateFormProps {
  fieldData?: PropertyInfo;
  children?: any;
}

const ListingCreateForm: FC<ListingCreateFormProps> = ({
  fieldData,
  ...props
}) => {
  const propertyTypeOptions = groupBy(fieldData?.propertyType, "group");

  const getPropertyTypeOptions = (items: any[]) => {
    let content: ReactElement[] = [];
    items.forEach((item, index) =>
      content.push(
        <MultiTierDropdownOption key={index} value={item.value}>
          {item.label}
        </MultiTierDropdownOption>
      )
    );

    return content;
  };

  const getPropertyTypeItems = () => {
    let content: ReactElement[] = [];
    for (let key in propertyTypeOptions) {
      const items: any[] = propertyTypeOptions[key];
      content.push(
        <MultiTierDropdownItem key={key} value={key} label={key}>
          {getPropertyTypeOptions(items)}
        </MultiTierDropdownItem>
      );
    }
    return content;
  };

  const onSubmit = (formValues: any) => {
    console.log(formValues);
  };

  return (
    <div className={styles.ListingCreateForm}>
      <Formik
        validationSchema={ListingCreateFormSchema}
        onSubmit={onSubmit}
        initialValues={{ propertyType: "DUPLEX", name: "" }}
      >
        <Form className="form">
          <div className="field__container">
            <label className="field__label" htmlFor="propertyType">
              Name
            </label>
            <MultiTierDropdown
              placeholder="Select Property Type"
              name="propertyType"
            >
              {getPropertyTypeItems()}
            </MultiTierDropdown>
            <ErrorMessage name="propertyType">
              {(msg) => <div>{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="field__container">
            <label className="field__label" htmlFor="propertyType">
              Name
            </label>

            <Input id="name" name="name" placeholder="John" />

            <ErrorMessage name="name">{(msg) => <div>{msg}</div>}</ErrorMessage>
          </div>

          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ListingCreateForm;
