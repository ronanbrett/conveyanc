import { AppRoutes, RouteWithSubRoutes } from "@core/routes/routes.config";
import React from "react";
import { Switch } from "react-router-dom";

interface ListingsProps {
  routes: AppRoutes[];
  children?: any;
}

const Listings = ({ routes }: ListingsProps) => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  );
};

export default Listings;
