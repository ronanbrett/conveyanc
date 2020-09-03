<template>
  <div ref="children" class="collapse-component">
    <slot v-bind="sharedData" :data="sharedData"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, ref } from 'vue';

let id = 0;

const Collapse = defineComponent({
  setup(props, { emit, attrs, slots }) {
    const children = ref();
    const closeAll = (et: any) => console.log(et);

    const sharedData = { id: id++, closeAll };

    onMounted(() => {
      if (slots && slots.default) {
        const defaultSlot = slots.default();
        defaultSlot[0].props = { id: 1 };

        console.log(defaultSlot[0]);
      }
    });

    return { closeAll, children, sharedData };
  },
});

export default Collapse;
</script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style lang="scss">
@import './src/styles/vars';

.collapse-component {
  border: 2px solid var(--border-light-color);
  border-radius: var(--border-radius);

  & > .collapse-item:first-child .collapse-item__trigger {
    border-top: none;
  }

  .collapse-component {
    border: none;

    & > .collapse-item .collapse-item__trigger {
      border-top: 1px solid var(--border-light-color);
    }
  }
}
</style>
