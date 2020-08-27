<template>
  <nav class="theSideNav">
    <UserProfileCard />
  </nav>
</template>

<script src="./TheSideNav.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
nav {
  padding: var(--spacing-l) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
