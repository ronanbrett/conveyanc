export type User = any; // eslint-disable-line @typescript-eslint/no-explicit-any

export interface AuthState {
  error?: Error;
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User;
}

const isLocalLoggedIn = localStorage.getItem("VL_AUTH_IS_LOGGED");
export const initialAuthState: AuthState = {
  isAuthenticated: isLocalLoggedIn ? true : false,
  // In SSR mode the library will never check the session, so loading should be initialised as false
  isLoading: typeof window !== "undefined",
};
