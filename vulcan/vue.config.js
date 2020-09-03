const fs = require('fs');
const path = require('path');

module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
  devServer: {
    port: 5000,
    https: true,
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
    disableHostCheck: true,
    proxy: {
      '^/api': {
        target: 'https://localhost:6001',
        secure: false,

        ws: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
