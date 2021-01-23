<template>
  <div class="Nav">
    <sup>&copy;</sup>Copyright {{ year }}
  </div>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getUTCFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/footer.scss';
</style>
