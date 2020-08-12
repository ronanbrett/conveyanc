const fs = require('fs');

module.exports = {
  devServer: {
    port: 5000,
    https: true,
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
    disableHostCheck: true,
    proxy: {
      '^/api': {
        target: 'https://localhost:6001',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
