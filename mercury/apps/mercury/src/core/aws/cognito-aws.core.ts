import { CognitoIdentity } from '@aws-sdk/client-cognito-identity';

async function example() {
  const client = new CognitoIdentity({ region: 'us-west-2' });
}
