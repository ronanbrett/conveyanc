<template>
  <section class="page">
    <h1 class="page__title">Property Details</h1>
    <article class="input-container">
      <PropertyCreateTypeInput v-model="type" />
      <p>Message is: {{ type }}</p>
    </article>
  </section>
</template>

<script src="./PropertyCreatePage.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
@import './src/styles/vars';
</style>
