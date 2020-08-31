import { ComponentCustomProps, defineComponent, Ref, ref } from 'vue';

const IconButton = defineComponent({
  props: {
    icon: String,
  },
  setup() {
    const root: Ref<HTMLElement | null> = ref(null);

    const blur = () => {
      const el = root.value;
      //   if (el) {
      //     el.blur();
      //   }
    };

    return {
      blur,
      root,
    };
  },
});

export default IconButton;
