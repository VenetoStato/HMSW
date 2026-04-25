/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // The site currently displays broken images because Vercel/Next image optimization rejects
    // the generated optimize requests. Disable optimization so <Image> uses the original URL.
    unoptimized: true,

    // Keep remotePatterns for future optimization re-enable.
    remotePatterns: [
      { protocol: 'https', hostname: 'www.quadruped.de', pathname: '/**' },
      { protocol: 'https', hostname: 'quadruped.de', pathname: '/**' },
    ],
  },
};

export default nextConfig;
