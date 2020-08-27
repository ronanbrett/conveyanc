<template>
  <div class="container">
    <section v-if="isAuthenticated" class="media">
      <img src="@/assets/profile.png" alt />
      <div class="media__content">
        <h1>Hello,</h1>
        <p>{{ capitalize(user?.username) }}</p>

        <button @click="logout()">Logout</button>
      </div>
    </section>

    <section v-if="!isAuthenticated" class="media">
      <button @click="login()">Login</button>
    </section>
  </div>
</template>

<script src="./UserProfileCard.ts" lang="ts"></script>

<!-- Add "scoped" attribute to limit SCSS to this component only -->
<style scoped lang="scss">
.container {
  width: 80%;
  min-height: 60px;
}
section {
  background-color: var(--white-color);

  box-shadow: 20px 20px 60px 0 rgba(216, 222, 226, 0.67),
    -20px -20px 60px 0 rgba(255, 255, 255, 0.5);
  border-radius: var(--border-radius);

  h1 {
    color: var(--highlight-color);
    margin-bottom: var(--spacing-xxs);
  }

  img {
    width: 45px;
  }
}
</style>
