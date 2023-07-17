/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
  }
  
  module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8000/:path*', // Ajuste para a porta correta usada pela sua API Rust
        },
      ];
    },
  };