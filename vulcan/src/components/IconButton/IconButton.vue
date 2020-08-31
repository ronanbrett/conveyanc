<template>
  <button ref="root" @click="blur()">
    <div class="icon__container">
      <i class="material-icons">{{ icon }}</i>
      <div class="icon__background"></div>
    </div>
  </button>
</template>

<script src="./IconButton.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
@import './src/styles/vars';

button.mini {
  .icon__container {
    width: 35px;
    height: 35px;
  }
}

button {
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  border-radius: 50%;

  border: 2px solid transparent;

  &:hover,
  &:focus {
    .icon__background {
      transform: scale(0.9);
      opacity: 1;
    }
  }

  &:focus {
    outline: none;
  }

  &:focus,
  &:active {
    border: 2px solid var(--highlight-color);
  }

  &:hover,
  &:active {
    .icon__background {
      background-color: var(--highlight-color);
    }
  }

  .icon__background {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    transform: scale(0.7);
    opacity: 0;
    background-color: var(--border-light-color);
    z-index: 0;

    transition: all 1300ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  i {
    z-index: 1;
  }

  .icon__container {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: all 750ms cubic-bezier(0.075, 0.82, 0.165, 1);

    // &:hover,
    // &:active {
    //   background-color: var(--border-light-color);
    // }
  }
}
</style>
