/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["abs.twimg.com", "i.pravatar.cc", "res.cloudinary.com"],
  },
  env: {
    GUEST_EMAIL: process.env.GUEST_EMAIL,
    GUEST_PASSWORD: process.env.GUEST_PASSWORD,
    DEFAULT_PROFILE_IMAGE: process.env.DEFAULT_PROFILE_IMAGE,
  },
};
