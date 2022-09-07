/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const baseConfig = withPWA({
  pwa: {
    dest: "public",
    skipWaiting: true,
    register: true,
    runtimeCaching,
    disable: process.env.NODE_ENV === "development",
    reactStriceMode: true,
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      domains: ["localhost", "whitebridge.site"],
    },
  },

  // compiler: {
  //   styledComponents: true,
  // },
  // i18n: {
  //   locales: [
  //     "en",
  //     "ru",
  //     "uz",
  //     "es",
  //     "ar",
  //     "it",
  //     "de",
  //     "pl",
  //     "et",
  //     "nl",
  //     "he",
  //     "ko",
  //     "cs",
  //     "ro",
  //     "fr",
  //     "ja",
  //   ],
  //   defaultLocale: "en",
  //   localeDetection: false,
  // },
});

const configInProduction = withPWA({
  dest: "public",
  skipWaiting: true,
  register: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
  reactStriceMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["localhost", "whitebridge.site"],
  },
});

const nextConfig = configInProduction;

// process.env.NODE_ENV === "production"
// ? { ...baseConfig, ...configInProduction }
// : baseConfig;

module.exports = withPWA({
  dest: "public",
  skipWaiting: true,
  register: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
});
