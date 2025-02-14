/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'mistertako.ru',
            port: '',
            pathname: '/**',
          },
        ],
    },
};

export default nextConfig;
