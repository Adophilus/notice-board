import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      user: null
    }
  },
  getters: {
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      localStorage.user = JSON.stringify(user)
    }
  },
  actions: {
  },
  modules: {
  }
})
