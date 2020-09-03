import { IconButton } from "@components";
import React from "react";

import styles from "./ListingCard.module.scss";
import img from "./property-1.jpg";

interface ListingCardProps {
  children?: any;
}

const ListingCard = (props: ListingCardProps) => {
  return (
    <div className={styles.ListingCard}>
      <div className="card__container">
        <article className="card">
          <header className="card__header">
            <img src={img} alt="Logo" />

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
        </article>
      </div>
    </div>
  );
};

export default ListingCard;
