import { PropertyDto } from "@core/api/graphql";
import { ListingStore } from "@scenes/Listings/Listings.store";
import React, { useEffect, useState } from "react";
import { ListingCard } from "../../components";
import styles from "./ListingsView.module.scss";

interface ListingsViewProps {
  children?: any;
}

const ListingsView = (props: ListingsViewProps) => {
  const [listingState, setListingState] = useState(ListingStore.initialState);

  useEffect(() => {
    const sub = ListingStore.subscribe(setListingState);
    ListingStore.init();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <div className={`${styles.ListingsView} page`}>
      {listingState.data.map((listing: PropertyDto) => (
        <ListingCard key={listing._id} />
      ))}
    </div>
  );
};

export default ListingsView;
