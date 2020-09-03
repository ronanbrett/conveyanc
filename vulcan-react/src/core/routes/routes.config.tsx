import { useAuth } from "@core/auth";
import React, { lazy } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export interface RouteMeta {
  title?: string;
  subTitle?: string;
}
export interface AppRoutes extends RouteProps {
  path: string;
  component: any;
  topnav?: any;
  breadcrumb?: string;
  isProtected?: boolean;
  routes?: AppRoutes[];
  meta: RouteMeta;
}

export const ROUTES: AppRoutes[] = [
  {
    path: "/",
    meta: {
      title: "Home",
    },
    breadcrumb: "Home",
    exact: true,
    isProtected: false,
    component: lazy(() => import("../../scenes/Home")),
  },
  {
    path: "/listings",
    meta: {
      title: "Listings",
    },
    breadcrumb: "Listings",
    exact: false,
    isProtected: true,
    component: lazy(() =>
      import(/* webpackChunkName: "Listing" */ "../../scenes/Listings")
    ),
    routes: [
      {
        path: "/listings",
        meta: {
          title: "Listings",
          subTitle: "Create",
        },
        breadcrumb: "Listings",

        exact: true,
        component: lazy(() =>
          import(
            /* webpackChunkName: "Listing" */ "../../scenes/Listings/views/ListingsView"
          )
        ),
      },
      {
        path: "/listings/create",
        breadcrumb: "Create Listing",

        meta: {
          title: "Create Listing",
          subTitle: "Create",
        },
        exact: true,
        component: lazy(() =>
          import(
            /* webpackChunkName: "Listing" */ "../../scenes/Listings/views/ListingsCreateView"
          )
        ),
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
