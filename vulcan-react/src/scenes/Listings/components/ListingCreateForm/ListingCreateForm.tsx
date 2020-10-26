import {
  Button,
  CharacterInputWrapper,
  ImageUploader,
  Input,
  MultiTierDropdown,
  MultiTierDropdownItem,
  MultiTierDropdownOption,
  RichTextEditorWrapper,
  Select,
  TopNavPortal,
  UploadCheckbox,
  Wizard,
  WizardStep,
} from "@components";
import { PropertyInfo, S3ObjectArgs } from "@core/api/graphql";
import { FormikEffect } from "@core/utils";
import { ErrorMessage, Form, Formik, FormikContextType } from "formik";
import { groupBy } from "lodash-es";
import React, {
  FC,
  MutableRefObject,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { GeocodeResult, getGeoCoding } from "@services/google.service";
import { object, string, array } from "yup";
import styles from "./ListingCreateForm.module.scss";

const ListingCreateFormSchema = object().shape({
  propertyType: string().required("You must select a type"),
  eircode: string().required("You must enter an eircode").min(7),
  address: string().required("Please enter the first line of your address"),
  images: array().min(1, "You must add at least one image"),
});

export interface ListingCreateFormValues {
  description?: string;
  propertyType?: string;
  address?: string;
  geocode?: GeocodeResult;
  eircode?: string;
  images?: S3ObjectArgs[];
}

const initialValues = {
  propertyType: "",
  address: "",
  eircode: "",
};

interface ListingCreateFormProps {
  formRef: MutableRefObject<any>;
  onFormSubmit: (formValue: ListingCreateFormValues) => void;
  onGeocodeUpdate: (geocode: GeocodeResult) => void;
  fieldData?: PropertyInfo;
  children?: any;
}

const ListingCreateForm: FC<ListingCreateFormProps> = ({
  onFormSubmit,
  formRef,
  onGeocodeUpdate,
  fieldData,
  ...props
}) => {
  const [address, setAddress] = useState<string>();
  const [geocode, setGeocode] = useState<GeocodeResult>();
  const [eircode, setEircode] = useState<string>();
  const [eirCodeErrors, setEircodeErrors] = useState<string[]>();

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

  const onChange = ({
    values,
    errors,
  }: FormikContextType<ListingCreateFormValues>) => {
    if (!errors.eircode && values.eircode.length === 7) {
      setEircode(values.eircode);
    }
  };

  useEffect(() => {
    const getGeocodedAddress = async () => {
      setEircodeErrors(null);
      setGeocode(null);
      setAddress(null);
      const newCoordinates = await getGeoCoding(eircode).toPromise();

      if (newCoordinates.length === 0) {
        return setEircodeErrors(["missing eircode"]);
      }
      setGeocode(newCoordinates[0]);
      onGeocodeUpdate(newCoordinates[0]);
      setAddress(newCoordinates[0].formatted_address);
    };

    if (eircode) {
      getGeocodedAddress();
    }
  }, [eircode]);

  const onSubmit = (formValues: any) => {
    onFormSubmit({ ...formValues, geocode });
  };

  return (
    <div className={`${styles.ListingCreateForm}`}>
      <Wizard<ListingCreateFormValues>
        formRef={formRef}
        onSubmit={onSubmit}
        initialStep={2}
        initialValues={initialValues}
      >
        <WizardStep
          onSubmit={() => console.log("Step1 onSubmit")}
          validationSchema={ListingCreateFormSchema}
        >
          <FormikEffect<ListingCreateFormValues>
            onChange={onChange}
          ></FormikEffect>

          <TopNavPortal>
            <Button onClick={() => formRef?.current?.handleSubmit()}>
              Next
            </Button>
          </TopNavPortal>

          <h1 className="title">Property Details</h1>

          <div className="field__container">
            <label className="field__label" htmlFor="propertyType">
              Type of Property
            </label>

            <MultiTierDropdown
              placeholder="Select Property Type"
              name="propertyType"
            >
              {getPropertyTypeItems()}
            </MultiTierDropdown>

            <ErrorMessage className="field__error" name="propertyType">
              {(msg) => <div>{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="field__container">
            <label className="field__label" htmlFor="eircode">
              Eircode
            </label>

            <CharacterInputWrapper
              errors={eirCodeErrors}
              size={7}
              name="eircode"
            />

            <ErrorMessage className="field__error" name="eircode">
              {(msg) => <div>{msg}</div>}
            </ErrorMessage>

            {eirCodeErrors ? (
              <div className="field__error">
                No Address found for this eircode
              </div>
            ) : (
              <></>
            )}

            {address ? (
              <div className="field__error">{geocode.formatted_address}</div>
            ) : (
              <></>
            )}
          </div>

          <div className="field__container">
            <label className="field__label" htmlFor="propertyType">
              Address
            </label>

            <Input
              id="name"
              name="address"
              placeholder="Enter the first line of your address"
            />

            <ErrorMessage className="field__error" name="address">
              {(msg) => <div>{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="field__container">
            <div className="field__label">Description</div>

            <RichTextEditorWrapper
              name="description"
              placeholder="Tell us about the Property"
            ></RichTextEditorWrapper>
          </div>

          <div className="field__container">
            <label className="field__label" htmlFor="propertyType">
              Images
            </label>
            <ImageUploader name="images"></ImageUploader>

            <ErrorMessage className="field__error" name="images">
              {(msg) => <div>{msg}</div>}
            </ErrorMessage>
          </div>
        </WizardStep>

        <WizardStep
          onSubmit={() => console.log("Step1 onSubmit")}
          validationSchema={ListingCreateFormSchema}
        >
          <FormikEffect<ListingCreateFormValues>
            onChange={onChange}
          ></FormikEffect>

          <TopNavPortal>
            <Button onClick={() => formRef?.current?.handleSubmit()}>
              Next
            </Button>
          </TopNavPortal>

          <h1 className="title">Documents</h1>

          <div className="field__container">
            <UploadCheckbox
              title="Title Deeds"
              subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. "
              name="upload"
            ></UploadCheckbox>
          </div>

          <div className="field__container">
            <UploadCheckbox title="BER Report" name="upload"></UploadCheckbox>
          </div>
        </WizardStep>

        <WizardStep
          onSubmit={() => console.log("Step2 onSubmit")}
          validationSchema={ListingCreateFormSchema}
        >
          <FormikEffect<ListingCreateFormValues>
            onChange={onChange}
          ></FormikEffect>

          <TopNavPortal>
            <Button onClick={() => formRef?.current?.handleSubmit()}>
              Save
            </Button>
          </TopNavPortal>

          <h1 className="title">Auction</h1>

          <div className="field__container">
            <label className="field__label" htmlFor="transactionType">
              Transaction Type
            </label>

            <Select
              id="transactionType"
              name="transactionType"
              placeholder="Choose a transaction type"
              options={["Private Treaty", "Auction", "Tender"]}
            ></Select>

            <ErrorMessage className="field__error" name="propertyType">
              {(msg) => <div>{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="field__container">
            <label className="field__label" htmlFor="transactionType">
              Guide Price
            </label>
            <Input id="name" name="guidePrice" placeholder="Guide Price" />
          </div>
        </WizardStep>
      </Wizard>
    </div>
  );
};

export default ListingCreateForm;
