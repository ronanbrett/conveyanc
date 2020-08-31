<template>
  <section class="page">
    <div class="properties" v-if="result && result.propertiesPaged.properties">
      <ProperyListCard
        v-for="property of result.propertiesPaged.properties"
        :key="property.propertyId"
      />
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

.page {
  height: calc(100vh - 70px);
  overflow: auto;
  scroll-snap-type: y mandatory;
}
</style>
