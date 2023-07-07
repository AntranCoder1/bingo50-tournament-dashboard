export const REDIS_CONFIG: any = {
  host: process.env.REDIS_CONFIG_HOST || "localhost",
  port: process.env.REDIS_CONFIG_PORT || "49153",
  username: "default",
  password: process.env.REDIS_CONFIG_PASSWORD,
};
