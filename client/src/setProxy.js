const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/book/',
    createProxyMiddleware({
      target: 'http://localhost:1234',
      changeOrigin: true,
    })
  );
};