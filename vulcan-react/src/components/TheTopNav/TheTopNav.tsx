import React from "react";
import styles from "./TheTopNav.module.scss"; // Import css modules stylesheet as styles

import { useLocation } from "react-router-dom";
import { getRouteMeta } from "core/routes/routes.config";

interface TheTopNavProps {
  children?: any;
}

const TheTopNav = (props: TheTopNavProps) => {
  // const { pathname } = useLocation();
  // const route = getRouteMeta(pathname);

  return (
    <div data-testid="TheTopNav" className={styles.TheTopNav}>
      <header>
        {/* <h1>{route.title}</h1> */}
        <div className="vertical-spacer vertical-spacer--half"></div>
        <h2 className="subTitle">Subtitle</h2>
      </header>
    </div>
  );
};

export default TheTopNav;
