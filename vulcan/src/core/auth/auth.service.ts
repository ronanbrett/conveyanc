import { startAttestation, startAssertion, supportsWebauthn } from '@simplewebauthn/browser';

export async function register() {
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

  console.log(verificationJSON);
}

export async function login() {
  const resp = await fetch('/api/auth/login');

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

  console.log(verificationJSON);
}

export async function health() {
  const resp = await fetch('/api/health');

  console.log(resp);
}

export default {
  register,
  login,
  health,
};
