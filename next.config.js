
module.exports = {
  images: {
    domains: ['dl5zpyw5k3jeb.cloudfront.net', 'res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
}