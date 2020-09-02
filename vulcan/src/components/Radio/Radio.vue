<template>
  <label class="input-radio-container">
    <span class="wrapClasses">
      <span :class="`input-radio-inner`"></span>
      <input
        name="drone"
        type="radio"
        :value="label"
        :disabled="disabled"
        :checked="checked"
        :class="`input-radio-input`"
      />
    </span>
    <span><slot></slot></span>
  </label>
</template>

<script src="./Radio.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
@import './src/styles/vars';
</style>
