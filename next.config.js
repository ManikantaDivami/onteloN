/** @type {import('next').NextConfig} */
// const { i18n } = require("./next-i18next.config");

module.exports = {
  // i18n: {
  //   defaultLocale: "en",
  //   locales: ["en"],
  // },
  images: {
    domains: ["ontelo-static-assets.s3.eu-west-2.amazonaws.com"],
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
};
