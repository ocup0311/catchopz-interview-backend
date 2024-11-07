import * as dotenv from 'dotenv';

export function loadEnvVars() {
  if (process.env.NODE_ENV === 'development') {
    dotenv.config({path: '.env.dev'});
  }
}
