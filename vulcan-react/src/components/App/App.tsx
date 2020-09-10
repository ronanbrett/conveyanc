import { TheSideNav, TheTopNav } from "@components";
import { ROUTES, RouteWithSubRoutes } from "@core/routes/routes.config";
import { GlobalStyleProvider } from "@core/theme/light.theme";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import styles from "./App.module.scss";

function App() {
  return (
    <Router>
      <GlobalStyleProvider>
        <div className={styles.App}>
          <TheTopNav />
          <TheSideNav />
          <div className="content">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {ROUTES.map((route, i) => (
                  <RouteWithSubRoutes key={i} {...route} />
                ))}
              </Switch>
            </Suspense>
          </div>
        </div>
      </GlobalStyleProvider>
    </Router>
  );
}

export default App;
