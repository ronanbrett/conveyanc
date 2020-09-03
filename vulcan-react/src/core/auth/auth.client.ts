import {
  startAttestation,
  startAssertion,
  supportsWebauthn,
} from "@simplewebauthn/browser";
import { User } from "./auth.state";

export class AuthClient {
  async register() {
    const rg = await fetch("/api/auth/register/user?username=ronan");

    const resp = await fetch("/api/auth/register");

    let attResp;
    try {
      // Pass the options to the authenticator and wait for a response
      attResp = await startAttestation(await resp.json());
    } catch (error) {
      // Some basic error handling
      if (error.name === "InvalidStateError") {
        console.log(
          "Error: Authenticator was probably already registered by user"
        );
      } else {
        console.log(error);
      }

      throw error;
    }

    const verificationResp = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attResp),
    });

    const verificationJSON = await verificationResp.json();
  }

  async login() {
    const resp = await fetch("/api/auth/login?username=ronan");

    let asseResp;
    try {
      // Pass the options to the authenticator and wait for a response
      asseResp = await startAssertion(await resp.json());
    } catch (error) {
      // Some basic error handling
      console.log(error);
      throw error;
    }

    const verificationResp = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(asseResp),
    });
    const verificationJSON = await verificationResp.json();
  }

  async checkLogin() {
    const resp = await fetch("/api/health");
    const body = await resp.json();

    return body as User;
  }

  async logout() {
    const resp = await fetch("/api/auth/logout");
    return resp;
  }
}
