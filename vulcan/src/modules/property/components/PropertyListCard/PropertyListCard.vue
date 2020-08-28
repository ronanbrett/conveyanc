<template>
  <article class="card">
    <img src="@/assets/property/property-1.jpg" alt />
    <div class="card__info propery-list-card">
      <h1>Bellingham, Mountrath Road</h1>
      <h2>Portlaoise, Co. Laois</h2>
    </div>
  </article>
</template>

<script src="./PropertyListCard.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
@import './src/styles/vars';

article {
  display: flex;
  flex-direction: column;
  margin-top: var(--spacing-l);
  max-width: 560px;
  scroll-snap-align: start;
}

.card__info {
  margin: 0;
  padding: var(--spacing-mx);
  background-color: #f1f2f630;
  display: flex;
  flex-direction: column;
}

.propery-list-card {
  h1 {
    @include type-caption;
    margin-bottom: var(--spacing-s);
  }

  h2 {
    @include type-caption-s;
  }
}
</style>
