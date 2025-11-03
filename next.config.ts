/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 Tells Next.js to generate static files in /out
  images: { unoptimized: true }, // Optional if using next/image
};

module.exports = nextConfig;
