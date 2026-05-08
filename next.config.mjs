/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Cloudflare Pages compatibility
  experimental: {
    isrMemoryCacheSize: 0,
  },
  // Skip static optimization for dynamic pages
  staticPageGenerationTimeout: 120,
}

export default nextConfig
