import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      user: null
    }
  },
  getters: {
    user () {
      return JSON.parse(localStorage.user)
      // return state.user
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      localStorage.user = JSON.stringify(user)
    },
    unsetUser (state) {
      state.user = undefined
      localStorage.removeItem('user')
    }
  },
  actions: {
  },
  modules: {
  }
})
