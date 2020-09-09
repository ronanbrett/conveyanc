export interface AWSConfig {
  region: string;
  ACCESS_KEY_ID: string;
  SECRET_ACCESS_KEY: string;
  cognito: {
    IdentityPoolId: string;
    Login: string;
  };
}
