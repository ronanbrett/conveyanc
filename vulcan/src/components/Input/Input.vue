<template>
  <input
    type="text"
    :value="val"
    @blur="onBlur"
    @input="val = $event.target.value"
    :autocomplete="autocomplete"
    :placeholder="placeholder"
  />
</template>

<script src="./Input.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
@import './src/styles/vars';

input {
  padding: var(--spacing-m) var(--spacing-m);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);

  &:focus {
    outline: none;
    border: 2px solid var(--highlight-color);
  }
}
</style>
