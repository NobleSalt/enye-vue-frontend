<template>
  <div class="ProfileList" style="margin-top:15px;">
    <div class="container-fluid row" v-if="!$store.state.profile.isError">
      <!-- Profiles -->
      <main class="col-12 col-md">
        <h4 class="py-1 align-center" v-if="paginated.length > 1">Profiles ({{ paginated.length }})</h4>
        <h4 class="py-1 align-center" v-else>Profile ({{ paginated.length }})</h4>
        <!-- Filter -->
        <div class="container-fluid d-md-none" v-show="!loading">
          <div
            class="d-md-none d-flex justify-content-between align-items-center flex-wrap"
          >
            <h3 class="text-center d-sm-none">Filter</h3>
            <div class="form-group">
              <label for="Gender">Gender</label>
              <select
                class="form-control mobile"
                name=""
                id="Gender"
                v-model="gender"
              >
                <option
                  v-for="(content, index) in filter.gender?.all"
                  :key="index"
                  :value="content"
                >
                  {{ content }}</option
                >
              </select>
            </div>

            <div class="form-group">
              <label for="pMethods">Payment Methods</label>
              <select
                class="form-control mobile"
                id="pMethods"
                v-model="pMethods"
              >
                <option
                  v-for="(method, index) in filter.pMethods?.all"
                  :key="index"
                  :value="method"
                  :selected="method === pMethods"
                >
                  {{ method }}</option
                >
              </select>
            </div>
          </div>
        </div>
        <!-- /Filter -->
        <div class="container-flid row" v-if="!loading">
          <Profile
            :profile="item"
            v-for="(item, index) in paginated"
            :key="index"
            v-show="paginated.length >= 1"
          />

          <!-- No content -->
          <div v-show="paginated.length < 1" class="no-content">
            No Content
          </div>
        </div>

        <div class="container-fluid spinner" v-else>
          <div class="container">
            <div class="yellow"></div>
            <div class="red"></div>
            <div class="blue"></div>
            <div class="violet"></div>
          </div>
        </div>
        <Pagination
          :pageNumber="pageNumber"
          :pageRange="pageRange"
          @pageChange="handlePageChange"
          v-show="!loading"
        />
      </main>
      <!-- /Profiles -->

      <!-- Filter -->
      <div class="col-2 d-none d-md-block" v-show="!loading">
        <h3>Filter</h3>

        <div class="form-group">
          <label for="Gender">Gender</label>
          <select class="form-control" name="" id="Gender" v-model="gender">
            <option
              v-for="(content, index) in filter.gender?.all"
              :key="index"
              :value="content"
            >
              {{ content }}</option
            >
          </select>
        </div>

        <br />

        <div class="form-group">
          <label for="pMethods">Payment Methods</label>
          <select class="form-control" name="" id="pMethods" v-model="pMethods">
            <option
              v-for="(method, index) in filter.pMethods?.all"
              :key="index"
              :value="method"
              :selected="method === pMethods"
            >
              {{ method }}</option
            >
          </select>
        </div>
      </div>
      <!-- /Filter -->
    </div>
    <div v-else class="spinner">
      <!-- Sorry There was an error -->
      <img src="/gif/error.gif" alt="Sorry There was an error" style="width: 100%;" />
    </div>
  </div>
</template>

<script>
import paginate from '@/utils/paginate'
import Profile from './Profile'
import { mapGetters, mapState } from 'vuex'
import Pagination from '@/components/Pagination'

export default {
  data() {
    return {
      pageNumber: 1,
      page: [],
      gender: 'Male',
      pMethods: 'cc',
      pageSize: 20
    }
  },
  components: {
    Profile,
    Pagination
  },
  methods: {
    handlePageChange(page) {
      this.pageNumber = page
    }
  },
  computed: {
    paginated() {
      const page = paginate(this.allPages, this.pageNumber, this.pageSize)
      return page
    },
    ...mapState({
      data: state => state.profile.data,
      loading: state => state.profile.loading,
      isError: state => state.profile.isError,
      allPages: state => state.profile.allPages
    }),
    ...mapGetters({
      filter: 'profile/filters'
    }),
    pageRange() {
      return (
        Math.round(this.allPages.length / this.pageSize)
      )
    }
  },
  watch: {
    pMethods(newCount, oldCount) {
      this.$store.commit('profile/handlePaymentSelect', newCount, {
        root: true
      })
    },
    gender(newCount, oldCount) {
      this.$store.commit('profile/handleGenderSelect', newCount, {
        root: true
      })
    }
  },
  mounted() {
    this.$store.dispatch('profile/fetchData', { root: true })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/profile_list.scss';
</style>
