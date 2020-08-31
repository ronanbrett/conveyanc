<template>
  <div class="card__container">
    <CardTransitionAnimation :isReady="isReady">
      <article class="card">
        <img src="@/assets/property/property-1.jpg" alt />
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

article {
  display: flex;
  flex-direction: column;
  max-width: 560px;

  box-shadow: 20px 20px 40px 0 rgba(216, 222, 226, 0.67),
    -20px -20px 40px 0 rgba(255, 255, 255, 0.5);
  border-radius: var(--border-radius);
}

.card__info {
  margin: 0;
  padding: var(--spacing-mx);
  background-color: #f1f2f630;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}

.card__container {
  display: flex;
  scroll-snap-align: start;
  flex-direction: column;

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
