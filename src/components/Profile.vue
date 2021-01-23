<template>
  <div class="col-12 col-md-6 Profile">
    <div
      class="Profile-img"
      v-if="profile.Gender?.toLowerCase() !== 'prefer to skip'"
    >
      <img
        :src="
          profile.Gender?.toLowerCase() === 'male'
            ? 'img/profile/male.png'
            : 'img/profile/female.png'
        "
      />
    </div>
    <div class="Profile-n" v-else>
      <h6>prefer not to say</h6>
    </div>
    <div class="d-flex Profile-content">
      <h1 class="badge">{{ fullName }}</h1>
      <span>phone: {{ profile.PhoneNumber }}</span>
      <h1>{{ profile.PaymentMethod }}</h1>
    </div>
    <div class="country">
      <img :src="countryFlag" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      countryFlag: 'flag/nigeria.png'
    }
  },
  props: ['profile'],
  computed: {
    fullName() {
      return `${this.profile.FirstName} ${this.profile.LastName}`
    }
  },
  methods: {
    fetchFlags() {
      const { Latitude, Longitude } = this.profile
      axios
        .get(
          `http://api.geonames.org/countryCodeJSON?lat=${Latitude}&lng=${Longitude}&username=${this.$store.state.profile.username}`
        )
        .then(res => {
          if (typeof res.data.countryName !== 'undefined') {
            const countryName = res.data.countryName
              .toLowerCase()
              .replace(' ', '-')
            this.countryFlag = `flag/${countryName}.png`
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    }
  },
  components: {},
  mounted() {
    this.fetchFlags()
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/profile.scss';
</style>
