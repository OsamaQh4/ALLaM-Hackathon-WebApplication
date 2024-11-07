// setupProxy.js
const { legacyCreateProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Only proxy requests that begin with /api
    legacyCreateProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
