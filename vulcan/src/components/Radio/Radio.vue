<template>
  <label
    :for="id"
    class="input-radio-container"
    :class="{ checked: isChecked(), focused: focused }"
  >
    <span class="input-radio__inner">
      <input
        :id="id"
        :name="name"
        v-bind="$attrs"
        type="radio"
        tabIndex="0"
        :value="value"
        @focus="focused = true"
        @blur="onBlur"
        @click="onChange"
        :disabled="disabled"
        :class="{ 'input-radio-input': true, hidden: true }"
      />
    </span>
    <span class="input-radio__radio">
      <span style="display: none">&nbsp;</span>
      <div class="input-radio__radio-circle">
        <div class="input-radio__radio-subcircle"></div>
      </div>
      <div class="input-radio__radio-text">
        <slot></slot>
      </div>
    </span>
  </label>
</template>

<script src="./Radio.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style lang="scss">
@import './src/styles/vars';

.input-radio {
  &-container {
    padding: 0;
    margin: 0;
    display: flex;
  }
  &__radio {
    display: flex;
    flex-direction: row;
    border: none;
    padding: var(--spacing-xs) 0;
    border: 2px solid white;

    &-circle {
      flex: 0 0 20px;
      width: 20px;
      height: 20px;
      margin-right: var(--spacing-s);
      border-radius: 50%;
      background-color: var(--border-light-color);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-subcircle {
      border-radius: 50%;
      width: 10px;
      height: 10px;
      background-color: white;
      transition: all 150ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
      transform: scale(0);
    }
  }
}

.focused {
  .input-radio {
    &__radio {
      &-circle {
        background-color: var(--highlight-color);
        position: relative;
        &::before {
          position: absolute;
          content: '';
          border-radius: 50%;
          width: 30px;
          height: 30px;
          background-color: var(--highlight-color);
          opacity: 0.3;
          top: -5px;
          left: -5px;
        }
      }
    }
  }
}

.checked {
  .input-radio {
    &__radio {
      &-circle {
        background-color: var(--highlight-color);
      }
      &-subcircle {
        transform: scale(1);
      }
    }
  }
}
</style>
