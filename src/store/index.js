import { createStore } from 'vuex'
import Admin from "@/models/Admin"

export default createStore({
  state () {
    return {
      user: null,
      isAdmin: false
    }
  },
  getters: {
    isAdmin (state) {
      return state.isAdmin
    },
    user () {
      return JSON.parse(localStorage.user)
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      localStorage.user = JSON.stringify(user)
      state.isAdmin = Admin.is(user._id)
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
