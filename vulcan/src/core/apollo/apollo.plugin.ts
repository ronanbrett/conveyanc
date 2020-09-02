/* eslint-disable */
// import { DefaultApolloClient } from '@vue/apollo-composable';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ApolloClient } from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
// import { App } from 'vue';

// const APOLLO_INJECTION_TOKEN = 'APOLLO_INJECTION_TOKEN';

// const apolloClient = new ApolloClient({
//   link: createHttpLink({
//     uri: 'https://localhost:6001/graphql',
//   }),
//   cache: new InMemoryCache(),
// });

// export const setupApolloClient = (app: App) => {
//   app.provide(DefaultApolloClient, apolloClient);
//   app.config.globalProperties.$apollo = apolloClient;
//   return app;
// };
