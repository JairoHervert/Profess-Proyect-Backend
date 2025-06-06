import env from "env-var";

export const envs = {
  PORT: env.get("PORT").default("3000").asPortNumber(),
  JWT_SEED: env.get("JWT_SEED").required().asString(),
  DATABASE_URL: env.get("DATABASE_URL").required().asString(),
  MAILER_EMAIL: env.get("MAILER_EMAIL").default("").asString(),
  MAILER_SECRET_KEY: env.get("MAILER_SECRET_KEY").default("").asString(),
  MAILER_SERVICE: env.get("MAILER_SERVICE").default("").asString(),
  SEND_EMAIL: env.get("SEND_EMAIL").default("false").asBool(),
};
