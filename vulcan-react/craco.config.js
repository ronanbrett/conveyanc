const fs = require("fs");
const path = require("path");
const { whenDev } = require("@craco/craco");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");

module.exports = {
  devServer: {
    port: 5000,
    https: true,
    key: fs.readFileSync("./certs/key.pem"),
    cert: fs.readFileSync("./certs/cert.pem"),
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "https://localhost:6001",
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
  webpack: {
    plugins: [
      new WebpackBar(),
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        reportFilename: "../bundle-stats/report.html",
        openAnalyzer: false,
        logLevel: "error",
      }),
    ],

    alias: {
      // Add the aliases for all the top-level folders in the `src/` folder.
      "@core": `${path.resolve(__dirname, "src/core/")}`,
      "@components": `${path.resolve(__dirname, "src/components/")}`,
      "@scenes": `${path.resolve(__dirname, "src/scenes/")}`,
      // Another example for using a wildcard character
      "~": `${path.resolve(__dirname, "src/")}/`,
    },
  },
  jest: {
    coreure: {
      moduleNameMapper: {
        // Jest module mapper which will detect our absolute imports.
        "^@core(.*)$": "<rootDir>/src/config$1",
        "^@components(.*)$": "<rootDir>/src/components$1",
        "^@scenes(.*)$": "<rootDir>/src/scenes$1",
        // Another example for using a wildcard character
        "^~(.*)$": "<rootDir>/src$1",
      },
    },
  },
};
