/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PROD_HOST: process.env.PROD_HOST,
    DEV_HOST: process.env.DEV_HOST,
  },
};

export default nextConfig;
