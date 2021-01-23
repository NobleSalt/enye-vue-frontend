<template>
  <div class="Nav">
    <router-link class="Nav-links" :to="{ name: 'Home' }">home</router-link>
    <div class="Nav-input">
      <input
        type="text"
        class="Nav-input-search"
        placeholder="Search for user"
        v-model="input"
      />
      <i class="bx bx-search-alt Nav-input-icon"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      content: []
    }
  },
  watch: {
    input(newInput, oldInput) {
      //
      this.content = this.$store.commit('profile/handleSearch', newInput, {
        root: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/nav.scss';
</style>
