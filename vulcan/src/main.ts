import { generateAuthentication } from '@/core/auth/auth.plugin';
import { CheckInViewport } from '@/core/directives/check-in-viewport/check-in-viewport.directive';
import App from '@/core/layout/BaseLayout/BaseLayout.vue';
import { generateValidation } from '@/core/forms/form-validations.core';
import { router } from '@/core/router/index';
import { createApp } from 'vue';
import './registerServiceWorker';

const auth = generateAuthentication();

generateValidation();

createApp(App).use(auth).directive('check-in-viewport', CheckInViewport).use(router).mount('#app');
