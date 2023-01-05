import withPWA from 'next-pwa'
import runtimeCaching from 'next-pwa/cache.js'
const isProduction = process.env.NODE_ENV === 'production'

const config = {
  // here goes your Next.js configuration
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/mushroom-photos/**',
      },
    ],
  },
}

const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: !isProduction,
  runtimeCaching,
})(config)

export default nextConfig
