import { defineComponent, onMounted, ref } from 'vue';
import { useAuth } from '@/core/auth/auth.service';
import { capitalize } from '@/filters/capitalize.filter';

const UserProfileCard = defineComponent({
  setup() {
    const { isAuthenticated, login, logout, user } = useAuth();

    return {
      isAuthenticated,
      login,
      logout,
      user,
      capitalize,
    };
  },
});

export default UserProfileCard;
