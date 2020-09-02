<template>
  <header class="theHeader">
    <h1 class="title">{{ title }}</h1>
    <div class="vertical-spacer vertical-spacer--half"></div>
    <h2 class="subTitle">{{ subTitle }}</h2>

    <router-view class="view two" name="header"></router-view>

    <!-- <router-link to="/about">/About</router-link>
    <router-link to="/">/Home</router-link> -->
    <!-- <section class="actions">
      <button @click="register">Register</button>
      <button @click="login">Login</button>
      <button @click="healthCheck">Check</button>
    </section>-->
  </header>
</template>

<script src="./TheHeader.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
@import '@/styles/vars';

header {
  width: 100%;
  height: 100%;
  background-color: var(--white-color);
  border-top-left-radius: 45px;

  padding: 0 var(--spacing-m) 0 var(--spacing-xl);
  display: flex;
  align-items: center;

  border-bottom: 1px solid var(--border-color);
}

h1 {
  @include type-header-s;
  margin: 5px var(--spacing-mx) 0 0;
}

h2 {
  @include type-header-s;
  margin: 5px var(--spacing-l) 0 var(--spacing-mx);
}
</style>
