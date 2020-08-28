<template>
  <section class="page">
    <h1>Property</h1>

    <div class="properties" v-if="result && result.properties">
      <ProperyListCard v-for="property of result.properties" :key="property.propertyId" />
    </div>
  </section>
</template>

<script src="./PropertyListPage.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
@import './src/styles/vars';

h1 {
  @include type-header-l;
  margin-bottom: var(--spacing-m);
}

.properties {
  height: calc(100vh - 190px);
  overflow: auto;
  scroll-snap-type: y mandatory;
}
</style>
