import TheHeader from '@/components/TheHeader/TheHeader.vue';
import TheSideNav from '@/components/TheSideNav/TheSideNav.vue';
import { scrollWaiter } from '@/core/router/scroll-waitor';
import { getSpacingCSSVars } from '@/core/styles/spacings.styles';
import { getLightThemeCSS } from '@/core/styles/lightTheme.styles';
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup: () => {
    const route = useRoute();
    const viewName = ref('default');

    const currentLocation = computed(() => {
      const { matched, ...rest } = route;
      return rest;
    });

    const cssVars = { ...getLightThemeCSS(), ...getSpacingCSSVars() };

    function flushWaiter() {
      scrollWaiter.flush();
    }
    function setupWaiter() {
      scrollWaiter.add();
    }

    return {
      route,
      cssVars,
      currentLocation,
      viewName,
      flushWaiter,
      setupWaiter,
    };
  },
  components: {
    TheHeader,
    TheSideNav,
  },
});
