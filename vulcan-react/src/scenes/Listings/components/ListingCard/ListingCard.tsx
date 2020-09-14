import { IconButton } from "@components";
import { PropertyDto } from "@core/api/graphql";
import React from "react";
import styles from "./ListingCard.module.scss";

interface ListingCardProps {
  property?: PropertyDto;
  children?: any;
}

const ListingCard = ({ property }: ListingCardProps) => {
  const mainImage = property?.images.length ? property.images[0].url : null;
  return (
    <div className={styles.ListingCard}>
      <div className="card__container">
        <article className="card">
          <header className="card__header">
            <img src={mainImage} alt="Logo" />

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
