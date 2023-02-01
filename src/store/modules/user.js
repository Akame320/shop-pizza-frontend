import api from '../../api/index'
import { roles } from "../../const/user";
import Vue from "vue";

const state = {
    token: localStorage.getItem('token') || '',
    status: '',
    user: {}
}

const getters = {
    HAS_AUTH: (state) => {
        return !!state.token
    },

    BASK_ID: (state) => {
        return state.user.basketId
    },

    IS_ADMIN: (state) => {
        return state.user.role === roles.ADMIN
    }
}

const mutations = {
    SET_USER: (state, payload) => {
        const { user } = payload
        state.user = user
    },

    SET_TOKEN: (state, payload) => {
        const { token } = payload
        localStorage.setItem('token', token)
        Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`
        state.token = token
    },

    REMOVE_USER: (state) => {
        localStorage.removeItem('token')
        state.user = {}
        state.token = null
    }
}

const actions = {
    REGISTRATION: async (context, payload) => {
        const { email, password, role } = payload
        const res = await api.registration(email, password, role)
        const { data } = res
        const { token, user } = data
        context.commit('SET_TOKEN', { token })
        context.commit('SET_USER', { user })
        await context.dispatch('SAVE_BASKET_SERVER')
        return res
    },

    LOGIN: async (context, payload) => {
        const { email, password } = payload
        const res = await api.login(email, password)
        const { data } = res
        const { token, user } = data
        context.commit('SET_TOKEN', { token })
        context.commit('SET_USER', { user })
        await context.dispatch('SAVE_BASKET_SERVER')
        return res
    },

    CHECK_TOKEN: async (context) => {
        const { data } = await api.check()
        if (data) {
            context.commit('SET_USER', { user: data })
        } else {
            localStorage.removeItem('token')
        }
    },

    LOGOUT: (context) => {
        context.commit('REMOVE_USER')
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
