import api from '../../api/index'
import { roles } from "../../const/user";

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
        console.log(user)
        state.user = user
    },

    SET_TOKEN: (state, payload) => {
        const { token } = payload
        localStorage.setItem('token', token)
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
        try {
            const { email, password, role } = payload
            const { data } = await api.registration(email, password, role)
            const { token, user } = data
            context.commit('SET_TOKEN', { token })
            context.commit('SET_USER', { user })
            await context.dispatch('SAVE_BASKET_SERVER')
        } catch (e) {
            console.log(e)
        }
    },
    LOGIN: async (context, payload) => {
        try {
            const { email, password } = payload
            const { data } = await api.login(email, password)
            const { token, user } = data
            context.commit('SET_TOKEN', { token })
            context.commit('SET_USER', { user })
            await context.dispatch('SAVE_BASKET_SERVER')
        } catch (e) {
            console.log(e)
        }
    },

    CHECK_TOKEN: async (context) => {
        const { data } = await api.check()
        console.log(data)
        context.commit('SET_USER', { user: data })
    },

    LOGOUT: (context) => {
        context.commit('REMOVE_USER')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
