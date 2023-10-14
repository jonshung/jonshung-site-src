/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "hcmus.edu.vn",
      },
    ],
  },
};

module.exports = nextConfig;
