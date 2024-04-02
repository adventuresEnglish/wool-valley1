/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io**",
      },
    ],
  },
  transpilePackages: ["lucide-react"],
};

export default nextConfig;
