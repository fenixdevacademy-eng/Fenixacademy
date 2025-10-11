/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    poweredByHeader: false,
    images: {
        unoptimized: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        NEXT_PUBLIC_APP_URL: 'https://fenixdevacademy.com.br',
        NEXT_PUBLIC_APP_NAME: 'Fênix Dev Academy',
    },
};

module.exports = nextConfig;