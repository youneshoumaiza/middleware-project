/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com'
      },
    ]
  },
  env: {
    SERVICE_PRODUITS: process.env.SERVICE_PRODUITS,
    SERVICE_COMMANDES: process.env.SERVICE_COMMANDES,
    SERVICE_PAIEMENT: process.env.SERVICE_PAIEMENT
  }
}

module.exports = nextConfig
