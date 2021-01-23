<template>
  <nav aria-label="...">
    <ul
      class="container-fluid pagination justify-content-center pagination-md"
      v-show="pageRange > 0"
    >
      <li
        class="page-item"
        :class="pageNumber < 1 ? 'disabled' : ''"
        @click="() => $emit('pageChange', pageNumber - 1)"
        v-show="pageNumber > 1"
      >
        <span class="page-link">Previous</span>
        <!-- <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a> -->
      </li>
      <li
        class="page-item"
        v-for="(page, index) in pageRange"
        :key="index"
        :class="page === pageNumber ? 'active' : ''"
        @click="() => $emit('pageChange', page)"
        v-show="page >= 1"
      >
        <span class="page-link">{{ page }}</span>
      </li>
      <li
        class="page-item"
        :class="pageNumber === pageRange ? 'disabled' : ''"
        v-show="pageNumber < pageRange"
        @click="() => $emit('pageChange', pageNumber + 1)"
      >
        <span class="page-link">Next</span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pageNumber', 'pageChange', 'pageRange']
}
</script>

<style lang="scss" scoped>
@import '@/styles/pagination.scss';
</style>
