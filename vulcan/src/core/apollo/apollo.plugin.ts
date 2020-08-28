/* eslint-disable */
import ApolloClient from 'apollo-boost';
import { App } from 'vue';

const APOLLO_INJECTION_TOKEN = 'APOLLO_INJECTION_TOKEN';
import { DefaultApolloClient } from '@vue/apollo-composable';

export const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'https://localhost:6001/graphql',
});

export const setupApolloClient = (app: App) => {
  app.provide(DefaultApolloClient, apolloClient);
  app.config.globalProperties.$apollo = apolloClient;
  return app;
};
