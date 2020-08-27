<template>
  <div :style="cssVars" id="app">
    <TheHeader title="Listings" subTitle="Renelagh" />
    <TheSideNav />
    <section class="content"></section>
  </div>
</template>

<script src="./App.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style lang="scss">
@import './src/styles/styles';

#app {
  color: #2c3e50;
  background-color: #f1f2f6;

  width: 100vw;
  height: 100vh;

  margin: 0;
  padding: 0;
  display: grid;

  grid-template:
    'sidenav header'
    'sidenav content';

  grid-template-rows: 70px auto;

  grid-template-columns: 20% auto;
}

.theHeader {
  grid-area: header;
}

.theSideNav {
  grid-area: sidenav;
}

.content {
  grid-area: content;
  background-color: white;
}
</style>
