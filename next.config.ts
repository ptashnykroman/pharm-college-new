import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.pharm.zt.ua',
        port: '9443',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 's3.pharm.zt.ua',
        port: '9000',
        pathname: '/main/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.pharm.zt.ua',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
    formats: ['image/webp'],
    qualities: [70, 75, 80, 90, 92, 95, 100],
  },
}

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG ?? '',
  project: process.env.SENTRY_PROJECT ?? '',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  debug: process.env.SENTRY_BUILD_DEBUG === 'true',
  widenClientFileUpload: true,
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
})
