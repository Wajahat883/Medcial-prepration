/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Only use rewrites in Docker environment
  async rewrites() {
    // For Vercel deployment, use NEXT_PUBLIC_API_URL directly
    if (process.env.VERCEL) {
      return [];
    }
    // For Docker/local development
    return [
      {
        source: "/api/:path*",
        destination: process.env.BACKEND_URL || "http://server:5000/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
