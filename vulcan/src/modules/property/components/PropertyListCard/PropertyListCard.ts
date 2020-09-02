import { defineComponent, onMounted, ref } from 'vue';
import CardTransitionAnimation from '@/core/animations/CardTransitionAnimation/CardTransitionAnimation.vue';
import IconButton from '@/components/IconButton/IconButton.vue';

const PropertyListCard = defineComponent({
  setup: () => {
    const isReady = ref(false);

    const PROPERTIES_CONTAINER = document.querySelector('.content');

    function visibilityChanged(isVisible: boolean) {
      isReady.value = isVisible;
    }

    return {
      document,
      isReady,
      visibilityChanged,
      PROPERTIES_CONTAINER,
    };
  },
  components: {
    CardTransitionAnimation,
    IconButton,
  },
});

export default PropertyListCard;
