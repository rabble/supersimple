/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // Change to export for static site generation
  images: {
    unoptimized: true, // Required for static export
  },
  // Handle dynamic routes in a static build
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      // Add other static routes as needed
      '/features': { page: '/features' },
      '/pricing': { page: '/pricing' },
      '/how-it-works': { page: '/how-it-works' },
      '/about': { page: '/about' },
    };
  },
};

module.exports = nextConfig;
