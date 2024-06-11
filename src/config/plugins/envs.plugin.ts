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
};
