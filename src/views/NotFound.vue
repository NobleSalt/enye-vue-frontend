<template>
  <router-link class="NotFound" :to="{ name: 'Home' }">
    <img src="img/404.png" alt="" />
  </router-link>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.NotFound {
  width: 100vw;
  overflow-x: hidden;
  img {
    width: 100%;
  }
}
</style>
