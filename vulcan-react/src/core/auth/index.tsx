import React, { ComponentType, useContext } from "react";

import { AuthContext, AuthContextInterface } from "./auth.context";

const useAuth = (): AuthContextInterface => useContext(AuthContext);

export interface WithAuth0Props {
  auth: AuthContextInterface;
}

const withAuth = <P extends WithAuth0Props>(
  Component: ComponentType<P>
): ComponentType<Omit<P, keyof WithAuth0Props>> => (props): JSX.Element => (
  <AuthContext.Consumer>
    {(auth: AuthContextInterface): JSX.Element => (
      <Component auth0={auth} {...(props as P)} />
    )}
  </AuthContext.Consumer>
);

export { useAuth, withAuth };
