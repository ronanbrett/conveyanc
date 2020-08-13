import { readFileSync } from 'fs';
export const httpsOptions = {
  key: readFileSync('./certs/key.pem'),
  cert: readFileSync('./certs/cert.pem'),
};
