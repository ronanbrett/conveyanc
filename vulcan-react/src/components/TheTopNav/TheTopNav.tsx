import { useBreadcrumbs } from "@hooks/useBreadcrumbs";
import { ROUTES } from "core/routes/routes.config";
import React from "react";
import styles from "./TheTopNav.module.scss"; // Import css modules stylesheet as styles

interface TheTopNavProps {
  children?: any;
}

const TheTopNav = (props: TheTopNavProps) => {
  const breadcrumbs = useBreadcrumbs(ROUTES);
  const route = { title: "Test", subTitle: false };

  const title = breadcrumbs[breadcrumbs.length - 1].breadcrumb;

  return (
    <div data-testid="TheTopNav" className={styles.TheTopNav}>
      <header>
        <div className="title">
          <h1>{title}</h1>
          {route.subTitle ? (
            <div>
              <div className="vertical-spacer vertical-spacer--half"></div>
              <h2 className="subTitle">{route.subTitle}</h2>
            </div>
          ) : (
            ""
          )}
        </div>

        <div id="topNavPortal"></div>
      </header>
    </div>
  );
};

export default TheTopNav;
