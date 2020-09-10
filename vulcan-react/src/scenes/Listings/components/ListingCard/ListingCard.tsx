import { IconButton } from "@components";
import React from "react";

import styles from "./ListingCard.module.scss";
import img from "./property-1.jpg";
import { PropertyDto } from "@core/api/graphql";
import { property } from "lodash-es";

interface ListingCardProps {
  property?: PropertyDto;
  children?: any;
}

const ListingCard = ({ property }: ListingCardProps) => {
  return (
    <div className={styles.ListingCard}>
      <div className="card__container">
        <article className="card">
          <header className="card__header">
            <img src={property.images[0].url} alt="Logo" />

            <div className="card__actions">
              <IconButton icon="favorite" />
            </div>
          </header>
          <div
            v-check-in-viewport="{
            callback: visibilityChanged,
            once: true,
          }"
            className="card__info property-list-card"
          >
            <h1>Bellingham, Mountrath Road</h1>
            <h2>Portlaoise, Co. Laois</h2>
          </div>

          {/* <div className="card__info-box">
            <img src="assets/icon/bed.svg" />
          </div> */}
        </article>
      </div>
    </div>
  );
};

export default ListingCard;
