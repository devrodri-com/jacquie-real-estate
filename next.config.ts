// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./next-intl.config.ts');
export default withNextIntl({
  reactStrictMode: true,
  images: {
    qualities: [65, 75, 85],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
