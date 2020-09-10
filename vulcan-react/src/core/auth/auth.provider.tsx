import { useLocalStorage } from "hooks";
import React, { useEffect, useReducer, useState } from "react";
import { AuthClient } from "./auth.client";
import { AuthContext } from "./auth.context";
import { reducer } from "./auth.reducer";
import { initialAuthState, User } from "./auth.state";
import { interval, of, empty } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";

export interface AuthProviderOptions {
  children?: React.ReactNode;
}

export const AuthProvider = (opts: AuthProviderOptions): JSX.Element => {
  const { children } = opts;

  const [client] = useState(() => new AuthClient());
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const [loggedIn, setLoggedIn] = useLocalStorage("VL_AUTH_IS_LOGGED");

  useEffect(() => {
    async function checkIsLoggedIn() {
      try {
        const { user, loggedIn } = await client.checkLogin();

        if (loggedIn) {
          dispatch({ type: "INITIALISED", isAuthenticated: loggedIn, user });
        }
      } catch (error) {
        dispatch({ type: "LOGOUT" });
        dispatch({ type: "ERROR", error: new Error(error) });
      }
    }

    checkIsLoggedIn();
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
    setLoggedIn(loggedIn ? loggedIn : null);
    dispatch({ type: "LOGIN_POPUP_COMPLETE", isAuthenticated: loggedIn, user });
  };

  const logout = async (opts: any = {}) => {
    await client.logout();
    console.log("loggout");
    setLoggedIn(null);

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
