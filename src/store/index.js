import { createStore } from 'vuex'
import Admin from '@/models/admin.model.model.model'

export default createStore({
  state() {
    const localStorageToken = localStorage.getItem('token')
    let token = null
    if (localStorageToken) token = localStorageToken

    return {
      token
    }
  },
  getters: {
    token(state) {
      return state.user
    }
  },
  mutations: {
    setToken(state, { token }) {
      state.token = token
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      const res = await fetch({
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      const json = await res.json()
      commit('user', json.user)
      // TODO: dispatch action to `setToken`
      commit('token', json.token)
    },
    setToken({ commit }, payload) {
      localStorage.setItem('token', JSON.stringify(token))
      commit({ type: 'setToken', payload: { token: payload } })
    }
  },
  modules: {}
})
