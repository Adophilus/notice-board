import { createStore } from 'vuex'
import Admin from '@/models/Admin'

export default createStore({
  state() {
    const user = JSON.parse(localStorage.user)
    return {
      user,
      isAdmin: user == null ? false : Admin.is(user._id)
    }
  },
  getters: {
    isAdmin(state) {
      return state.isAdmin
    },
    user(state) {
      return state.user
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
      state.isAdmin = Admin.is(user._id)
    },
    unsetUser(state) {
      state.user = null
      localStorage.removeItem('user')
    }
  },
  actions: {},
  modules: {}
})
