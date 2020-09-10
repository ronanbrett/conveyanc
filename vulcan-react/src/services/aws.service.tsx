import Amplify, { Auth, Storage } from "aws-amplify";

Amplify.configure({
  Auth: {
    identityPoolId: "eu-west-1:4c3a4410-6832-4b14-bef0-f34abc01996c", //REQUIRED - Amazon Cognito Identity Pool ID
    region: "eu-west-1", // REQUIRED - Amazon Cognito Region
  },
  Storage: {
    AWSS3: {
      bucket: "conveynac-property-0", //REQUIRED -  Amazon S3 bucket name
      region: "eu-west-1", //OPTIONAL -  Amazon service region
    },
  },
});

export { Storage, Auth };
