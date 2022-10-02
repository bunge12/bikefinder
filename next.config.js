const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = withPWA(
  withBundleAnalyzer({
    reactStrictMode: false,
    eslint: {
      ignoreDuringBuilds: true,
    },
    i18n: {
      locales: ['en'],
      defaultLocale: 'en',
    },
  })
);
