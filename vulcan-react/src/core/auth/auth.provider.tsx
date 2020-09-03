import React, { useEffect, useReducer, useState } from "react";
import { AuthContext } from "./auth.context";
import { initialAuthState } from "./auth.state";
import { reducer } from "./auth.reducer";
import { AuthClient } from "./auth.client";
export interface AuthProviderOptions {
  children?: React.ReactNode;
}

export const AuthProvider = (opts: AuthProviderOptions): JSX.Element => {
  const { children, ...clientOpts } = opts;

  const [client] = useState(() => new AuthClient());
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const { user, loggedIn } = await client.checkLogin();

        if (loggedIn) {
          dispatch({ type: "INITIALISED", isAuthenticated: !!user, user });
        }
      } catch (error) {
        dispatch({ type: "ERROR", error: new Error(error) });
      }
    })();
  }, [client]);

  const register = async () => {
    try {
      await register();
    } catch (err) {
      dispatch({ type: "ERROR", error: new Error(err) });
      return;
    }
  };

  const login = async () => {
    dispatch({ type: "LOGIN_POPUP_STARTED" });
    try {
      await client.login();
    } catch (err) {
      dispatch({ type: "ERROR", error: new Error(err) });
      return;
    }

    const { user, loggedIn } = await client.checkLogin();
    dispatch({ type: "LOGIN_POPUP_COMPLETE", isAuthenticated: loggedIn, user });
  };

  const logout = (opts: any = {}): void => {
    client.logout();

    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
