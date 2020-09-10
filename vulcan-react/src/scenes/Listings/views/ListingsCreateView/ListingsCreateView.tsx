import { PropertyInfo, PropertyType } from "@core/api/graphql";
import { getQueryRXJS } from "@core/utils/rxjs.utils";
import { ListingCreateAssistantPanel } from "@scenes/Listings/components";
import ListingCreateForm from "@scenes/Listings/components/ListingCreateForm";
import { ListingCreateFormValues } from "@scenes/Listings/components/ListingCreateForm/ListingCreateForm";
import {
  CREATE_PROPERTY,
  RETRIEVE_PROPERTY_INFO,
} from "@scenes/Listings/Listings.queries";
import { GeocodeResult } from "@services/google.service";
import { FormikHandlers } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { map, take } from "rxjs/operators";
import styles from "./ListingsCreateView.module.scss";
import { PropertyInputArgs } from "@core/api/graphql";

interface ListingsCreateViewProps {
  children?: any;
}

interface ListingCreateViewState extends PropertyInfo {
  isReady: boolean;
}

const ListingsCreateView = (props: ListingsCreateViewProps) => {
  const history = useHistory();

  const [fieldData, setFieldData] = useState<ListingCreateViewState>({
    propertyType: [],
    isReady: false,
  });

  const formRef = useRef<FormikHandlers>();

  const [geocode, setGeocode] = useState<GeocodeResult>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getQueryRXJS(RETRIEVE_PROPERTY_INFO)
        .pipe(
          take(1),
          map((x: { propertyInfo: PropertyInfo }) => x.propertyInfo)
        )
        .toPromise();

      setFieldData({ ...result, isReady: true });
    };

    fetchData();
  }, []);

  const setForm = async ({
    description,
    propertyType,
    images,
    address,
    geocode,
  }: ListingCreateFormValues) => {
    const { group } = fieldData.propertyType.find(
      (x) => x.value === propertyType
    );

    const vars: PropertyInputArgs = {
      type: group as PropertyType,
      description,
      images,
      location: {
        type: "Point",
        coordinates: [
          geocode.geometry.location.lng,
          geocode.geometry.location.lat,
        ],
      },
    };

    const result = await getQueryRXJS(CREATE_PROPERTY, {
      ...vars,
    })
      .pipe(take(1))
      .toPromise();

    console.log(result);
    history.push("/listings");
  };

  return (
    <div className={`${styles.ListingsCreateView}`}>
      {fieldData.isReady ? (
        <ListingCreateForm
          formRef={formRef}
          onFormSubmit={setForm}
          onGeocodeUpdate={setGeocode}
          fieldData={fieldData}
        ></ListingCreateForm>
      ) : (
        <></>
      )}
      <ListingCreateAssistantPanel
        geocode={geocode}
      ></ListingCreateAssistantPanel>
    </div>
  );
};

export default ListingsCreateView;
