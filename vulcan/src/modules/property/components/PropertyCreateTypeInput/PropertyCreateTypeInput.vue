<template>
  <div ref="elref">
    <div class="input">
      <div class="dropdown">
        <div @click.stop="onTrigger()" class="dropdown__trigger">
          <h1 class="dropdown__trigger-placeholder">
            {{ displayValue || 'Select the type of property' }}
          </h1>
          <IconButton
            @click.stop="onTrigger()"
            :class="{ open: isOpen }"
            class="dropdown__trigger-btn"
            icon="keyboard_arrow_down"
          />
        </div>

        <div v-show="isOpen" class="dropdown__options">
          <div class="dropdown__option" v-for="(groups, name, index) in opts" :key="name">
            <header class="dropdown__option-header" @click.stop="swapTab(index, name)">
              <h1>
                {{ name }}
              </h1>
              <IconButton
                @click.stop="swapTab(index, name)"
                :class="{ open: index === groupOpenIndex }"
                class="dropdown__trigger-btn mini"
                icon="keyboard_arrow_down"
              />
            </header>
            <ul class="dropdown__option-list" v-show="groupOpenIndex === index">
              <li
                class="dropdown__option-list-item"
                v-for="item in groups"
                :key="item.value"
                :class="{ selected: item.value === value?.subType }"
                @click="setValue(item.value)"
              >
                {{ item.label }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./PropertyCreateTypeInput.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
@import './src/styles/vars';

.dropdown {
  width: 100%;
  border: 2px solid var(--border-light-color);
  border-radius: var(--border-radius);
  margin-right: var(--spacing-m);

  &__trigger {
    width: 100%;
    padding: var(--spacing-s) var(--spacing-s) var(--spacing-s) var(--spacing-m);
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }

  &__option {
    border-bottom: 2px solid var(--border-light-color);
    cursor: pointer;

    &:last-of-type {
      border-bottom: none;
    }

    &-header {
      padding: var(--spacing-m) var(--spacing-m);
      display: flex;
      flex-direction: row;
      width: 100%;
      align-items: center;
      h1 {
        @include type-header(1);
        font-weight: 600;
        flex: 1 1;
      }
    }
  }

  &__option-list {
    display: flex;
    flex-direction: row;
    padding: 0 var(--spacing-m) var(--spacing-m);
  }

  &__option-list-item {
    margin-right: var(--spacing-m);
    cursor: pointer;

    &.selected {
      font-weight: 600;
      // color: var(--highlight-color);
    }
  }

  &__options {
    height: 300px;
    border-top: 2px solid var(--border-light-color);
  }

  &__trigger-placeholder {
    flex: 1 1;
    @include type-header(3);
    font-weight: 600;
    margin: 0;
  }

  &__trigger-btn {
    flex: 0 0;

    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &.open {
      transform: rotate(180deg);
    }
  }
}
</style>
