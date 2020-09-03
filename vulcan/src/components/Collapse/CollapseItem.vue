<template v-slot="slotProps">
  <div v-bind="{ isOutput: slotProps }" ref="elRef" class="collapse-item">
    <header class="collapse-item__trigger">
      <div class="collapse-item__trigger-content">
        <slot name="header"></slot>
      </div>
      <IconButton
        @click.stop="onTrigger(closeAll)"
        :class="{ open: isOpen }"
        class="collapse-item__trigger-btn"
        icon="keyboard_arrow_down"
      />
    </header>
    <div ref="root" v-show="isOpen" class="collapse-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, onUpdated } from 'vue';
import { IconButton } from '../index';

const CollapseItem = defineComponent({
  components: { IconButton },
  props: {
    data: {
      type: String,
    },
    open: {
      type: Boolean,
      default: false,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  setup(props, { emit, slots, attrs }) {
    const elRef = ref();
    const root: Ref<HTMLElement | undefined> = ref();
    const isOpen = ref(false);

    function onTrigger(ctx: any) {
      console.log(props);
      isOpen.value = !isOpen.value;
      emit('open', isOpen.value);
    }

    onMounted(() => {
      // console.log(props, attrs, root);
      // console.log(props, attrs, slots);
      if (!root.value) {
        return;
      }
    });

    return {
      onTrigger,
      isOpen,
      elRef,

      root,
    };
  },
});

export default CollapseItem;
</script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
@import './src/styles/vars';

.collapse-item {
  display: flex;
  flex-direction: column;

  cursor: pointer;

  &:last-of-type {
    border-bottom: none;
  }

  &__trigger {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: var(--spacing-s) var(--spacing-s) var(--spacing-s) var(--spacing-m);
    align-items: center;
    cursor: pointer;

    cursor: pointer;

    h1 {
      @include type-header(1);
      font-weight: 600;
      flex: 1 1;
    }
  }

  &__trigger-content {
    flex: 1 1 auto;
  }

  &__trigger-btn {
    flex: 0 0;

    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &.open {
      transform: rotate(180deg);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
