/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.alpha-orbital.com'], // hostname of the img url
  },
}

module.exports = nextConfig
