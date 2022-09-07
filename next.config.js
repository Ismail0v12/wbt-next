/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  skipWaiting: true,
  register: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching,
});

module.exports = withPWA({
  reactStriceMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["localhost", "whitebridge.site"],
  },
  i18n: {
    locales: [
      "en",
      "ru",
      "uz",
      "es",
      "ar",
      "it",
      "de",
      "pl",
      "et",
      "nl",
      "he",
      "ko",
      "cs",
      "ro",
      "fr",
      "ja",
    ],
    defaultLocale: "en",
    localeDetection: false,
  },
});
