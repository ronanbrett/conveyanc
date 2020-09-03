<template>
  <button @click="this.$emit('click', event)">
    <slot></slot>
  </button>
</template>

<script src="./Button.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
@import './src/styles/vars';

button {
  border: none;
  background-color: var(--highlight-color);
  padding: var(--spacing-s) var(--spacing-m);
  border: 2px solid white;

  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  border-radius: 8px;
  cursor: pointer;

  &:hover {
    border: 2px solid var(--highlight-color);
    background-color: white;
  }
}
</style>
