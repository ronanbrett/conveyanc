import { defineComponent } from 'vue';

import { register, login, health } from '@/core/auth/auth.service';

const TheHeader = defineComponent({
  methods: {
    async register() {
      await register();
    },
    async login() {
      await login();
    },
    async healthCheck() {
      await health();
    },
  },
});

export default TheHeader;
