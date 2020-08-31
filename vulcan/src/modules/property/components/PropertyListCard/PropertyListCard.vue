<template>
  <div class="card__container">
    <CardTransitionAnimation :isReady="isReady">
      <article class="card">
        <header class="card__header">
          <img src="@/assets/property/property-1.jpg" alt />

          <div class="card__actions">
            <IconButton icon="favorite" />
          </div>
        </header>
        <div
          v-check-in-viewport="{
            callback: visibilityChanged,
            once: true,
          }"
          class="card__info property-list-card"
        >
          <h1>Bellingham, Mountrath Road</h1>
          <h2>Portlaoise, Co. Laois</h2>
        </div>
      </article>
    </CardTransitionAnimation>
  </div>
</template>

<script src="./PropertyListCard.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
@import './src/styles/vars';

.card {
  max-width: 560px;
}

.card__actions {
  button {
    color: white;
    // color: var(--highlight-color);

    &:hover {
      color: white;
    }
  }
}

.card__container {
  scroll-snap-align: start;

  padding-top: var(--spacing-l);

  &:last-of-type {
    padding-bottom: var(--spacing-xl);
  }
}

.property-list-card {
  h1 {
    @include type-caption;
    margin-bottom: var(--spacing-s);
  }

  h2 {
    @include type-caption-s;
  }
}
</style>
