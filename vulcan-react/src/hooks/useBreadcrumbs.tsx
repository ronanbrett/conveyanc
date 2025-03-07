import { matchPath, useLocation } from "react-router";

type Location = ReturnType<typeof useLocation>;

export interface Options {
  currentSection?: string;
  disableDefaults?: boolean;
  excludePaths?: string[];
  pathSection?: string;
}

export interface MatchOptions {
  exact?: boolean;
  strict?: boolean;
  sensitive?: boolean;
}

export interface BreadcrumbsRoute {
  path: string;
  breadcrumb?: string;
  matchOptions?: MatchOptions;
  routes?: BreadcrumbsRoute[];
}

export interface BreadcrumbData {
  match: { url: string };
  location: Location;
  key?: string;
  breadcrumb: string;
}

const DEFAULT_MATCH_OPTIONS = { exact: true };
const NO_BREADCRUMB = "NO_BREADCRUMB";

/**
 * This method was "borrowed" from https://stackoverflow.com/a/28339742
 * we used to use the humanize-string package, but it added a lot of bundle
 * size and issues with compilation. This 4-liner seems to cover most cases.
 */
const humanize = (str: string): string =>
  str
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, (m) => m.toUpperCase());

const getDefaultBreadcrumb = ({
  currentSection,
  location,
  pathSection,
}: {
  currentSection: string;
  location: Location;
  pathSection: string;
}): BreadcrumbData => {
  const match = matchPath(pathSection, {
    ...DEFAULT_MATCH_OPTIONS,
    path: pathSection,
  }) /* istanbul ignore next: this is hard to mock in jest :( */ || {
    url: "not-found",
  };

  return {
    breadcrumb: humanize(currentSection),
    match,
    location,
  };
};

const getBreadcrumbMatch = ({
  currentSection,
  disableDefaults,
  excludePaths,
  location,
  pathSection,
  routes,
}: {
  currentSection: string;
  disableDefaults?: boolean;
  excludePaths?: string[];
  location: Location;
  pathSection: string;
  routes: BreadcrumbsRoute[];
}): typeof NO_BREADCRUMB | BreadcrumbData => {
  let breadcrumb: BreadcrumbData | typeof NO_BREADCRUMB | undefined;

  // Check the optional `excludePaths` option in `options` to see if the
  // current path should not include a breadcrumb.
  const getIsPathExcluded = (path: string): boolean =>
    matchPath(pathSection, {
      path,
      exact: true,
      strict: false,
    }) != null;

  if (excludePaths && excludePaths.some(getIsPathExcluded)) {
    return NO_BREADCRUMB;
  }

  // Loop through the route array and see if the user has provided a custom breadcrumb.
  routes.some(
    ({ breadcrumb: userProvidedBreadcrumb, matchOptions, path, ...rest }) => {
      if (!path) {
        throw new Error(
          "withBreadcrumbs: `path` must be provided in every route object"
        );
      }

      const match = matchPath(pathSection, {
        ...(matchOptions || DEFAULT_MATCH_OPTIONS),
        path,
      });

      // If user passed breadcrumb: null OR custom match options to suppress a breadcrumb
      // we need to know NOT to add it to the matches array
      // see: `if (breadcrumb !== NO_BREADCRUMB)` below.
      if (
        (match && userProvidedBreadcrumb === null) ||
        (!match && matchOptions)
      ) {
        breadcrumb = NO_BREADCRUMB;
        return true;
      }

      if (match) {
        // This covers the case where a user may be extending their react-router route
        // config with breadcrumbs, but also does not want default breadcrumbs to be
        // automatically generated (opt-in).
        if (!userProvidedBreadcrumb && disableDefaults) {
          breadcrumb = NO_BREADCRUMB;
          return true;
        }

        breadcrumb = {
          // Although we have a match, the user may be passing their react-router config object
          // which we support. The route config object may not have a `breadcrumb` param specified.
          // If this is the case, we should provide a default via `humanize`.
          breadcrumb: userProvidedBreadcrumb || humanize(currentSection),
          match,
          location,
          ...rest,
        };
        return true;
      }
      return false;
    }
  );

  // User provided a breadcrumb prop, or we generated one above.
  if (breadcrumb) {
    return breadcrumb;
  }

  // If there was no breadcrumb provided and user has disableDefaults turned on.
  if (disableDefaults) {
    return NO_BREADCRUMB;
  }

  // If the above conditionals don't fire, generate a default breadcrumb based on the path.
  return getDefaultBreadcrumb({
    pathSection,
    // include a "Home" breadcrumb by default (can be overrode or disabled in config).
    currentSection: pathSection === "/" ? "Home" : currentSection,
    location,
  });
};

export const getBreadcrumbs = ({
  routes,
  location,
  options = {},
}: {
  routes: BreadcrumbsRoute[];
  location: Location;
  options?: Options;
}): BreadcrumbData[] => {
  const matches: BreadcrumbData[] = [];
  const { pathname } = location;

  pathname
    .split("?")[0]
    // Split pathname into sections.
    .split("/")
    // Reduce over the sections and call `getBreadcrumbMatch()` for each section.
    .reduce(
      (previousSection: string, currentSection: string, index: number) => {
        // Combine the last route section with the currentSection.
        // For example, `pathname = /1/2/3` results in match checks for
        // `/1`, `/1/2`, `/1/2/3`.
        const pathSection = !currentSection
          ? "/"
          : `${previousSection}/${currentSection}`;

        // Ignore trailing slash or double slashes in the URL
        if (pathSection === "/" && index !== 0) {
          return "";
        }

        const breadcrumb = getBreadcrumbMatch({
          currentSection,
          location,
          pathSection,
          routes,
          ...options,
        });

        // Add the breadcrumb to the matches array
        // unless the user has explicitly passed.
        // { path: x, breadcrumb: null } to disable.
        if (breadcrumb !== NO_BREADCRUMB) {
          matches.push(breadcrumb);
        }

        return pathSection === "/" ? "" : pathSection;
      },
      ""
    );

  return matches;
};

const flattenRoutes = (routes: BreadcrumbsRoute[]): BreadcrumbsRoute[] =>
  routes.reduce((arr, route: BreadcrumbsRoute): BreadcrumbsRoute[] => {
    if (route.routes) {
      return arr.concat([route, ...flattenRoutes(route.routes)]);
    }
    return arr.concat(route);
  }, [] as BreadcrumbsRoute[]);

export const useBreadcrumbs = (
  routes?: BreadcrumbsRoute[],
  options?: Options
): BreadcrumbData[] =>
  getBreadcrumbs({
    routes: flattenRoutes(routes || []),
    location: useLocation(),
    options,
  });
