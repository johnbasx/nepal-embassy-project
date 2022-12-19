/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // distDir: '/next/build',
  images: {
    domains: ['http://127.0.0.1', 'https://cube69.pythonanywhere.com/'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
