/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    PUBLIC_GOOGLE_ANALYTICS_ID: process.env.PUBLIC_GOOGLE_ANALYTICS_ID,
    PUBLIC_GTM_ID: process.env.PUBLIC_GTM_ID,
    PUBLIC_GOOGLE_TAG_ID: process.env.PUBLIC_GOOGLE_TAG_ID,
    PUBLIC_CLARITY_ID: process.env.PUBLIC_CLARITY_ID,
    VITE_GA_MEASUREMENT_ID: process.env.VITE_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_WEBHOOK_URL: process.env.NEXT_PUBLIC_WEBHOOK_URL,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // This ensures that 404.html is generated for static hosting
  generateBuildId: () => 'build',
};

module.exports = nextConfig;
