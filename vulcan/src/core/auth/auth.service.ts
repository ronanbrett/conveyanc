/* eslint-disable */

import { defineComponent, App, shallowRef, ref, inject, reactive } from 'vue';
import { startAttestation, startAssertion, supportsWebauthn } from '@simplewebauthn/browser';

export const AUTH_INJECT_TOKEN = 'AUTH_SERVICE_KEY';

declare module 'vue' {
  // 3. Declare augmentation for Vue
  export interface ComponentCustomProperties {
    $auth: any;
  }
}

export const generateAuthentication = () => {
  let isReady = ref(false);
  let isAuthenticated = ref(true);
  let user = reactive({
    username: 'Test',
  });

  async function register() {
    const rg = await fetch('/api/auth/register/user?username=ronan');

    const resp = await fetch('/api/auth/register');

    let attResp;
    try {
      // Pass the options to the authenticator and wait for a response
      attResp = await startAttestation(await resp.json());
    } catch (error) {
      // Some basic error handling
      if (error.name === 'InvalidStateError') {
        console.log('Error: Authenticator was probably already registered by user');
      } else {
        console.log(error);
      }

      throw error;
    }

    const verificationResp = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attResp),
    });

    const verificationJSON = await verificationResp.json();

    isAuthenticated.value = true;
    isReady.value = true;
  }

  async function login() {
    const resp = await fetch('/api/auth/login?username=ronan');

    let asseResp;
    try {
      // Pass the options to the authenticator and wait for a response
      asseResp = await startAssertion(await resp.json());
    } catch (error) {
      // Some basic error handling
      console.log(error);
      throw error;
    }

    const verificationResp = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(asseResp),
    });
    const verificationJSON = await verificationResp.json();

    isAuthenticated.value = true;
    isReady.value = true;
  }

  async function checkLogin() {
    const resp = await fetch('/api/health');
    const body = await resp.json();

    isAuthenticated.value = body.loggedIn;
    if (body.user) {
      user.username = body.user.username;
    }
    return resp;
  }

  async function logout() {
    const resp = await fetch('/api/auth/logout');

    if (resp.status === 200) {
      isAuthenticated.value = false;
    }

    return resp;
  }

  const authInstance = {
    isAuthenticated,
    user,
    login,
    register,
    checkLogin,
    logout,

    async install(app: App) {
      const auth = this;
      app.provide(AUTH_INJECT_TOKEN, auth);

      app.config.globalProperties.$auth = auth;

      const response = await checkLogin();

      isReady.value = true;
    },
  };

  return authInstance;
};

export function useAuth(): any {
  const router = inject(AUTH_INJECT_TOKEN)!;

  if (!router) {
    return {};
  }

  return router;
}
