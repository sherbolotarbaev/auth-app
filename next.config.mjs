/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });

    return config;
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'zwolzmcodtrfbcofztei.supabase.co',
      'lh3.googleusercontent.com',
      'localhost:3000',
    ],
  },

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
