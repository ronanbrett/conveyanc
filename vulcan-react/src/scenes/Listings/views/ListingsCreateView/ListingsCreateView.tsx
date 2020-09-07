import { PropertyInfo, PropertyType } from "@core/api/graphql";
import { getQueryRXJS } from "@core/utils/rxjs.utils";
import ListingCreateForm from "@scenes/Listings/components/ListingCreateForm";
import { RETRIEVE_PROPERTY_INFO } from "@scenes/Listings/Listings.queries";
import { TopNavPortal, Button } from "components";
import React, { useEffect, useState } from "react";
import { map, take } from "rxjs/operators";

import styles from "./ListingsCreateView.module.scss";

interface ListingsCreateViewProps {
  children?: any;
}

interface ListingCreateViewState extends PropertyInfo {
  isReady: boolean;
}

const ListingsCreateView = (props: ListingsCreateViewProps) => {
  const [fieldData, setFieldData] = useState<ListingCreateViewState>({
    propertyType: [],
    isReady: false,
  });

  function activateLasers() {
    console.log("The link was clicked.");
  }

  useEffect(() => {
    // const info = async () =>
    //   await getQueryRXJS(RETRIEVE_PROPERTY_INFO).pipe(take(1)).toPromise();

    // info();

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

  //

  return (
    <div className={`${styles.ListingsCreateView} page`}>
      <TopNavPortal>
        <Button onClick={activateLasers}>Save</Button>
      </TopNavPortal>
      {fieldData.isReady ? (
        <ListingCreateForm fieldData={fieldData}></ListingCreateForm>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ListingsCreateView;
