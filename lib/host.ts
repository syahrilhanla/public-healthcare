export const pathname = process.env.NODE_ENV === "production"
  ? process.env.PROD_HOST : process.env.DEV_HOST;
