import { startAssertion, startAttestation } from "@simplewebauthn/browser";
import { Auth, Storage } from "@services/aws.service";
import { User } from "./auth.state";
import { date } from "yup";

export class AuthClient {
  async register() {
    await fetch("/api/auth/register/user?username=ronan");

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

    return verificationJSON;
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

    return verificationJSON;
  }

  async checkLogin(): Promise<User> {
    let body;
    try {
      const resp = await fetch("/api/health");
      body = await resp.json();
    } catch (error) {
      throw error;
    }

    const { aws, username } = body.user;
    Auth.signOut();
    await Auth.federatedSignIn(
      "developer",
      {
        token: aws.Token,
        identity_id: aws.IdentityId,
        expires_at: aws.expiresIn * 1000 + new Date().getTime(),
      },
      { name: username, identityId: aws.IdentityId } as any
    );

    return body as User;
  }

  async logout() {
    const resp = await fetch("/api/auth/logout");
    Auth.signOut();
    Storage.configure({ identityId: null });

    return resp;
  }
}
