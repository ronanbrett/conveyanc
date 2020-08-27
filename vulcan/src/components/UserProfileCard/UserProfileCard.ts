import { defineComponent, onMounted, ref, watch } from 'vue';
import { useAuth } from '@/core/auth/auth.service';
import { capitalize } from '@/filters/capitalize.filter';
import { generateParticles } from '@/core/animations/particles.animations';

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
