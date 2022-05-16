/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["abs.twimg.com", "i.pravatar.cc"],
  },
  env: {
    GUEST_EMAIL: process.env.GUEST_EMAIL,
    GUEST_PASSWORD: process.env.GUEST_PASSWORD,
  },
};
