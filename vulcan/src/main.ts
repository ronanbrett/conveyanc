import { createApp } from 'vue';
import App from './core/layout/BaseLayout/BaseLayout.vue';
import './registerServiceWorker';
import router from './core/router/index';

import { generateAuthentication } from './core/auth/auth.service';

const auth = generateAuthentication();
createApp(App).use(auth).use(router).mount('#app');
