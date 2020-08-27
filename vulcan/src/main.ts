import { createApp } from 'vue';
import App from './layout/App/App.vue';
import './registerServiceWorker';
import router from './router';

import { generateAuthentication } from './core/auth/auth.service';

const auth = generateAuthentication();
const app = createApp(App);
app.use(auth);
app.use(router);
app.mount('#app');
