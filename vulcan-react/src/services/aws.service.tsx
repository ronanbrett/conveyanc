import { AuthClient } from "@core/auth/auth.client";
import Amplify, { Auth, Storage } from "aws-amplify";

Amplify.configure({
  Auth: {
    identityPoolId: CONFIG.AWS.COGNITO.IDENTITY_POOL_ID, //REQUIRED - Amazon Cognito Identity Pool ID
    region: CONFIG.AWS.REGION, // REQUIRED - Amazon Cognito Region

    refreshHandlers: {
      developer: async () => {
        const authClient = new AuthClient();
        const { aws } = await authClient.checkLogin();

        return new Promise((res, rej) => {
          const data = {
            token: aws.Token,
            identity_id: aws.IdentityId,
            expires_at: aws.expiresIn * 1000 + new Date().getTime(),
          };
          res(data);
        });
      },
    },
  },
  Storage: {
    AWSS3: {
      bucket: CONFIG.AWS.S3.BUCKET, //REQUIRED -  Amazon S3 bucket name
      region: CONFIG.AWS.REGION, //OPTIONAL -  Amazon service region
    },
  },
});

export { Storage, Auth };
