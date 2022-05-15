/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
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
  },
};

module.exports = nextConfig;
