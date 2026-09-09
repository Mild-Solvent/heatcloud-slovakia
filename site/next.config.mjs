/** @type {import('next').NextConfig} */
const nextConfig = {
  // Small runtime image: server.js plus only the files it actually needs.
  output: 'standalone',
  // Keeps every URL identical to the previous build (/legal/terms/), so links
  // already shared stay valid.
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        // A preview of a company that does not exist yet: keep it out of any
        // crawler that finds its way onto the tailnet.
        { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    }];
  },
};

export default nextConfig;
