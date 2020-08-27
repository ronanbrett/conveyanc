import { createApp } from 'vue';
import App from './core/layout/BaseLayout/BaseLayout.vue';
import './registerServiceWorker';
import router from './core/router/index';

import { generateAuthentication } from './core/auth/auth.service';

const auth = generateAuthentication();
const app = createApp(App);
app.use(auth);
app.use(router);
app.mount('#app');
