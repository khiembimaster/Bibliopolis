/* @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lucide-react'],
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

export default nextConfig;
