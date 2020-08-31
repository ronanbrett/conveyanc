/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, onMounted, ref, RendererElement, toRefs, watch } from 'vue';
import anime from 'animejs';

const CardTransitionAnimation = defineComponent({
  props: {
    isReady: Boolean,
  },
  setup: (props) => {
    const root = ref(null);

    const { isReady } = toRefs(props);

    function afterEnter(el: HTMLElement) {
      const info = el.querySelector('.card__info');

      anime({
        targets: info,
        translateX: [
          { value: -50, duration: 0, delay: 300 },
          { value: 0, duration: 1000, delay: 0 },
        ],
        opacity: [
          { value: 0, duration: 0, delay: 300 },
          { value: 1, duration: 1000, delay: 0 },
        ],
      });
    }

    onMounted(() => {
      const $el = root.value as unknown;
      const el = $el as HTMLElement;
      const info = el.querySelector('.card__info') as HTMLElement;

      info.style.opacity = '0';

      if (isReady?.value) {
        afterEnter(el);
      }
    });

    watch(isReady as any, (value) => {
      if (value) {
        afterEnter(root.value as any);
      }
    });

    return { afterEnter, onMounted, root };
  },
});

export default CardTransitionAnimation;
