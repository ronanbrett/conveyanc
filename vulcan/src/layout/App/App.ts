import { defineComponent } from 'vue';
import { getLightThemeCSS } from '@/core/styles/theme';
import { getSpacingCSSVars } from '@/core/styles/spacings.styles';
import TheHeader from '@/components/TheHeader/TheHeader.vue';
import TheSideNav from '@/components/TheSideNav/TheSideNav.vue';

export default defineComponent({
  computed: {
    cssVars: () => ({ ...getLightThemeCSS(), ...getSpacingCSSVars() }),
  },
  components: {
    TheHeader,
    TheSideNav,
  },
});
