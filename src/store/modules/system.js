const state = {
  errors: {
    message: '',
  },
}

const getters = {
  GET_ERROR: (state) => {
    return state.errors
  },
}

const mutations = {
  SET_ERROR: (state, payload) => {
    state.errors = { ...payload }
    setTimeout(() => {
      state.errors = {}
    }, 3000)
  },
}

export default {
  state,
  getters,
  mutations,
}
