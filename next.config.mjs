/* @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lucide-react'],
  images: {
    domains: ['firebasestorage.googleapis.com','lh3.googleusercontent.com'],
  },
};

export default nextConfig;
