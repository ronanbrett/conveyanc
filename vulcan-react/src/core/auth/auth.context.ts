import { createContext } from "react";
import { AuthState, initialAuthState } from "./auth.state";

export interface AuthContextInterface extends AuthState {
  login: (options?: any) => Promise<void>;

  register: (options?: any) => Promise<void>;

  logout: (options?: any) => void;
}

const stub = (): never => {
  throw new Error("You forgot to wrap your component in <Auth0Provider>.");
};

const initialContext = {
  ...initialAuthState,
  login: stub,
  register: stub,
  logout: stub,
};

export const AuthContext = createContext<AuthContextInterface>(initialContext);
