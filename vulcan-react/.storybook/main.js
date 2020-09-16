const path = require("path");
const ConfigWebpackPlugin = require("config-webpack");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: {
        skipPropsWithName: ["Storage"],
      },
    },
  },

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need

    config.plugins.push(new ConfigWebpackPlugin());

    config.resolve.alias = {
      // Add the aliases for all the top-level folders in the `src/` folder.
      "@core": `${path.resolve(__dirname, "../src/core/")}`,
      "@components": `${path.resolve(__dirname, "../src/components/")}`,
      "@scenes": `${path.resolve(__dirname, "../src/scenes/")}`,
      "@services": `${path.resolve(__dirname, "../src/services/")}`,
      "@hooks": `${path.resolve(__dirname, "../src/hooks/")}`,
      "@testutils": `${path.resolve(__dirname, "../testing")}`,
      // Another example for using a wildcard character
    };

    // Return the altered config
    return config;
  },
};
