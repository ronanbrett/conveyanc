import { useAuth } from '@/core/auth/auth.plugin';
import { capitalize } from '@/core/filters/capitalize.filter';
import { defineComponent, onMounted } from 'vue';

const UserProfileCard = defineComponent({
  setup() {
    let vueCanvas: CanvasRenderingContext2D | null;

    onMounted(() => {
      // const c = document.getElementById('ripple') as HTMLCanvasElement;
      // const ctx = c.getContext('2d');
      // vueCanvas = ctx;
    });
    const { isAuthenticated, login, logout, user } = useAuth();

    // function triggerAnimation() {
    //   if (vueCanvas) {
    //     generateParticles(vueCanvas);
    //   }
    // }

    return {
      isAuthenticated,
      login,
      logout,
      // triggerAnimation,
      user,
      capitalize,
    };
  },
});

export default UserProfileCard;
