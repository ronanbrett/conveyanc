<template>
  <header>
    <h1>The Header</h1>

    <section class="actions">
      <button @click="register">Register</button>
      <button @click="login">Login</button>
      <button @click="healthCheck">Check</button>
    </section>
  </header>
</template>

<script src="./TheHeader.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
header {
  width: 100%;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: center;

  & > button {
    flex: 0 0 auto;
    margin-right: 8px;
  }
}
</style>
