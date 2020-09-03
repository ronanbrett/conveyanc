import { TopNavPortal, Button } from "components";
import React from "react";

import styles from "./ListingsCreateView.module.scss";

interface ListingsCreateViewProps {
  children?: any;
}

const ListingsCreateView = (props: ListingsCreateViewProps) => {
  function activateLasers() {
    console.log("The link was clicked.");
  }

  return (
    <div className={styles.ListingsCreateView}>
      <TopNavPortal>
        <Button onClick={activateLasers} label="Create" />
      </TopNavPortal>
      ListingsCreateView
    </div>
  );
};

export default ListingsCreateView;
