import { useAuth } from "@core/auth";
import Listings from "@scenes/Listings/Listings";
import React, { lazy } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export interface RouteMeta {
  title?: string;
}
export interface AppRoutes extends RouteProps {
  path: string;
  component: any;
  isProtected?: boolean;
  routes?: AppRoutes[];
  meta: RouteMeta;
}

function Sandwiches() {
  return <h2>Sandwiches</h2>;
}

export const ROUTES: AppRoutes[] = [
  {
    path: "/",
    meta: {
      title: "Home",
    },
    exact: true,
    isProtected: false,
    component: lazy(() => import("../../scenes/Home")),
  },
  {
    path: "/listings",
    meta: {
      title: "Listings",
    },
    exact: false,
    isProtected: true,
    component: Listings,
    routes: [
      {
        path: "/listings",
        meta: {
          title: "Listings",
        },
        exact: true,
        component: Sandwiches,
      },
    ],
  },
];

export const getRouteMeta = (path: string, routes?: AppRoutes[]): RouteMeta => {
  let result = {};
  ROUTES.forEach((route) => {
    if (route.path === path) {
      result = route.meta;
    }

    if (route.routes) {
      return getRouteMeta(path, route.routes);
    }
  });

  return result;
};

export function RouteWithSubRoutes(route: AppRoutes) {
  const { isAuthenticated } = useAuth();

  if (route.isProtected && !isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: {},
        }}
      />
    );
  }

  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}
