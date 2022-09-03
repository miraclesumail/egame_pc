const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addWebpackAlias,
  addWebpackPlugin,
  addWebpackModuleRule
} = require('customize-cra');
const { GenerateSW } = require('workbox-webpack-plugin');
const path = require('path');

module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint(),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src/')
  }),
  process.env.NODE_ENV === 'production' &&
  addWebpackPlugin(
    new GenerateSW({
      swDest: 'service-worker.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 7 * 24 * 60 * 60
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    })
  ),
);
