<template>
  <Nav />
  <router-view />
  <Footer />
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default {
  components: { Nav, Footer }
}
</script>

<style lang="scss" scoped>
@import '@/styles/_p.scss';
</style>
