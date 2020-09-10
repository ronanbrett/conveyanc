interface CONFIGI {
  env: string;
  Google: {
    GEOCODING_API_KEY: string;
  };
  Mapbox: {
    MAP_TOKEN: string;
  };
  AWS: {
    REGION: string;
    S3: {
      BUCKET: string;
    };
    COGNITO: {
      IDENTITY_POOL_ID: string;
    };
  };
}

declare const CONFIG: CONFIGI;
