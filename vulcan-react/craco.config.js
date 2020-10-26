const fs = require("fs");
const path = require("path");
const { whenDev } = require("@craco/craco");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");
const ConfigWebpackPlugin = require("config-webpack");

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
      new ConfigWebpackPlugin(),
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
      "@hooks": `${path.resolve(__dirname, "src/hooks/")}`,
      "@services": `${path.resolve(__dirname, "src/services/")}`,
      // Another example for using a wildcard character
      "~": `${path.resolve(__dirname, "src/")}/`,
    },
  },
  jest: {
    configure: {
      globals: {
        "ts-jest": {
          tsConfig: "tsconfig.test.json",
        },
      },

      moduleNameMapper: {
        // Jest module mapper which will detect our absolute imports.
        "^@core(.*)$": "<rootDir>/src/core$1",
        "^@components(.*)$": "<rootDir>/src/components$1",
        "^@testutils(.*)$": "<rootDir>/src/testing$1",
        "^@scenes(.*)$": "<rootDir>/src/scenes$1",
        "^@hooks(.*)$": "<rootDir>/src/hooks$1",
        "^@services(.*)$": "<rootDir>/src/services$1",
        "^lodash-es$": "lodash",
        // Another example for using a wildcard character
        "^~(.*)$": "<rootDir>/src$1",
      },
    },
  },
};
