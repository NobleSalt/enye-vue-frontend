import { filterArrayofObjects } from '@/utils/filterArrayofObjects'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    loading: true,
    isError: false,
    allPages: [],
    assumedPages: [],
    gender: { active: '' },
    pMethods: { active: '' },
    username: 'NobleSalt'
  },
  getters: {
    filters(state) {
      if (!state.loading) {
        const gender = []
        const pMethods = []
        state.assumedPages.forEach(data => {
          !gender.includes(data.Gender) && gender.push(data.Gender)
          !pMethods.includes(data.PaymentMethod) &&
            pMethods.push(data.PaymentMethod)
        })
        return {
          gender: { all: gender, active: gender[0].toLowerCase() },
          pMethods: { all: pMethods, active: pMethods[0].toLowerCase() }
        }
      }
      return {}
    }
  },
  mutations: {
    // function to fetch data from api and update state.assumedPages
    handleFetchData(state) {
      // const url = 'https://api.enye.tech/v1/challenge/records'
      const url = '/records.json'
      axios
        .get(url)
        .then(res => {
          const profiles = res.data.records.profiles
          state.allPages = profiles
          state.assumedPages = profiles
        })
        .catch(() => {
          state.isError = true
        })
        .finally(() => {
          state.loading = false
        })
    },
    handleGenderSelect(state, payload) {
      state.loading = true
      state.allPages = state.assumedPages.filter(
        profile => profile.Gender === payload
      )
      state.active = payload
      state.loading = false
    },
    handlePaymentSelect(state, payload) {
      state.loading = true
      state.allPages = state.assumedPages.filter(
        profile => profile.PaymentMethod === payload
      )
      state.active = payload
      state.loading = false
    },
    handleSearch(state, payload) {
      state.loading = true
      state.allPages = state.assumedPages
      state.allPages = filterArrayofObjects(state.assumedPages, payload)
      state.loading = false
    }
  },
  actions: {
    fetchData({ commit }) {
      commit('handleFetchData')
    }
  }
}
