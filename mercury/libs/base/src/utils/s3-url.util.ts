import { S3Object, S3ObjectArgs, S3Level } from '@schemas/graphql';

export const getS3Url = (s3: S3ObjectArgs): S3Object => {
  let url;
  //https://conveynac-property-0.s3-eu-west-1.amazonaws.com/public/0cddcb06-82f6-44fe-8003-6a92bd60397d
  switch (s3.level) {
    case S3Level.PUBLIC:
      url = `https://${s3.bucket}.s3-${
        s3.region
      }.amazonaws.com/${s3.level.toLowerCase()}/${
        s3.directory ? s3.directory + '/' : ''
      }${s3.key}`;
      break;
    case S3Level.PRIVATE:
    case S3Level.PROTECTED:
      url = `https://${s3.bucket}.s3-${
        s3.region
      }.amazonaws.com/${s3.level.toLowerCase()}/{${s3.userId}}/${
        s3.directory ? s3.directory + '/' : ''
      }${s3.key}`;
      break;
  }
  return {
    ...s3,
    url,
  };
};
