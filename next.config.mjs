/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'build',
    images: {
        unoptimized: true,
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    reactStrictMode: false,
    api: {
        bodyParser: false,
    },
};

export default nextConfig;
