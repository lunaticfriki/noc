import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  MAILER: {
    MAIL: env.get('MAILER_MAIL').required().asEmailString(),
    SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
    SERVICE: env.get('MAILER_SERVICE').required().asString(),
  },
  PROD: env.get('PROD').required().asBool(),
  MONGO_URL: env.get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
  MONGO_USER: env.get('MONGO_USER').required().asString(),
  MONGO_PASS: env.get('MONGO_PASS').required().asString(),
};
