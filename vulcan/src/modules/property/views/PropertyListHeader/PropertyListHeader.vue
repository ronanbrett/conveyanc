<template>
  <div class="propery-list-header">
    <router-link to="/listing/create">
      <Button>Create Listing</Button>
    </router-link>
  </div>
</template>

<script src="./PropertyListHeader.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
@import './src/styles/vars';

.propery-list-header {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
}
</style>
