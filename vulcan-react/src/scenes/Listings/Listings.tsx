import { AppRoutes, RouteWithSubRoutes } from "@core/routes/routes.config";
import React from "react";
import { Link, Switch } from "react-router-dom";

interface ListingsProps {
  routes: AppRoutes[];
  children?: any;
}

const Listings = ({ routes }: ListingsProps) => {
  console.log(routes);
  return (
    <div>
      <li>
        <Link to="/listings/create">Bus</Link>
      </li>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
};

export default Listings;
