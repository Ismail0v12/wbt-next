/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const baseConfig = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["localhost", "whitebridge.site"],
  },
  compiler: {
    styledComponents: true,
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

const configInProduction = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
});

const nextConfig = baseConfig;

// process.env.NODE_ENV === "production"
// ? { ...baseConfig, ...configInProduction }
// : baseConfig;

module.exports = nextConfig;
