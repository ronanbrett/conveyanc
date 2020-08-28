import { createApp } from 'vue';
import App from './core/layout/BaseLayout/BaseLayout.vue';
import './registerServiceWorker';

import router from './core/router/index';

import { generateAuthentication } from './core/auth/auth.service';
import { setupApolloClient } from './core/apollo/apollo.plugin';

const auth = generateAuthentication();
createApp(App).use(auth).use(setupApolloClient).use(router).mount('#app');
