import {
  CognitoIdentity,
  GetCredentialsForIdentityCommand,
} from '@aws-sdk/client-cognito-identity';
import { AWSConfig } from '../config/aws.config';
import { get, util } from 'config';

const config: AWSConfig = get('AWS');

export const generateCognitoToken = (userName: string, identityId: string) => ({
  IdentityPoolId: config.cognito.IdentityPoolId /* required */,
  Logins: {
    /* required */
    [config.cognito.Login]: `${userName}`,
    /* '<IdentityProviderName>': ... */
  },
  // IdentityId: `conveyanc:${userName}`,
  TokenDuration: 86400,
});

process.env['AWS_REGION'] = config.region;
process.env['AWS_ACCESS_KEY_ID'] = config.ACCESS_KEY_ID;
process.env['AWS_SECRET_ACCESS_KEY'] = config.SECRET_ACCESS_KEY;

export const cognitoClient = new CognitoIdentity({
  maxAttempts: 3,
});
