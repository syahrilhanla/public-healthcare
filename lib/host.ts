export const pathname = process.env.NODE_ENV === "development"
  ? process.env.DEV_HOST : process.env.PROD_HOST;
