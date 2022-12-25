import api from '../../api/index'

const state = {
    products: [],
    sizes: [],
    doughs: [],
    categories: [],
    basket: []
}

const getters = {
    PRODUCTS: state => {
        return state.products
    },

    SIZES: state => {
        return state.sizes
    },

    CATEGORIES: state => {
        return state.categories
    },

    DOUGHS: state => {
        return state.doughs
    },

    BASKET: state => {
        return state.basket
    },

    BASKET_SUM: state => {
        let sum = 0
        state.basket.forEach(item => {
            sum += item.price * item.count
        })
        return sum
    },

    BASKET_COUNT: state => {
        let count = 0
        state.basket.forEach(item => {
            count += item.count
        })
        return count
    },

    BASKET_IS_NOT_NULL: state => {
        return state.basket.length > 0
    }
}

const mutations = {
    SET_PRODUCTS: (state, payload) => {
        state.products = payload
    },

    INITIAL_SIZES: (state, payload) => {
        state.sizes = payload
    },

    INITIAL_CATEGORIES: (state, payload) => {
        state.categories = payload
    },

    INITIAL_DOUGHS: (state, payload) => {
        state.doughs = payload
    },

    UPDATE_BASKET: (state, payload) => {
        state.basket = payload
    },

    INCREMENT_BASKET_LOCAL: (state, payload) => {
        const { id } = payload
        const hasItemInBasket = state.basket.find(basketItem => basketItem.id === id)
        const { name, img, price } = state.products.find(product => product.id === id)

        if (hasItemInBasket) {
            hasItemInBasket.count++
        } else {
            state.basket.push({ name, img, price, id, count: 1 })
        }
    },

    DECREMENT_BASKET_LOCAL: (state, payload) => {
        const { id } = payload
        const hasItemInBasket = state.basket.find(basketItem => basketItem.id === id)
        if (!hasItemInBasket) return
        hasItemInBasket.count--
        if (hasItemInBasket.count === 0) {
            const idx = state.basket.findIndex(basketItem => basketItem.id === id)
            state.basket.splice(idx, 1)
        }
    },

    CLEAR_BASKET_LOCAL: (state, payload) => {
        console.log(payload)
        if (payload) {
            const { id } = payload
            const idx = state.basket.findIndex(basketItem => basketItem.id === id)
            state.basket.splice(idx, 1)
            return
        }

        const length = state.basket.length
        state.basket.splice(0, length)
    }
}

const actions = {
    GET_PRODUCTS: async (context) => {
        const { data } = await api.getProducts()
        context.commit('SET_PRODUCTS', data);
    },

    GET_SIZES: async (context) => {
        const { data } = await api.getSizes()
        context.commit('INITIAL_SIZES', data)
    },

    GET_CATEGORIES: async (context) => {
        const { data } = await api.getCategories()
        context.commit('INITIAL_CATEGORIES', data)
    },

    GET_DOUGHS: async (context) => {
        const { data } = await api.getDoughs()
        context.commit('INITIAL_DOUGHS', data)
    },

    INCREMENT_BASKET: async (context, payload) => {
        if (context.getters.HAS_AUTH) {
            await context.dispatch('SAVE_BASKET_SERVER')
        } else {
            context.commit('INCREMENT_BASKET_LOCAL', payload)
        }
    },

    DECREMENT_BASKET: async (context, payload) => {
        if (context.getters.HAS_AUTH) {
            await context.dispatch('SAVE_BASKET_SERVER')
        } else {
            context.commit('DECREMENT_BASKET_LOCAL', payload)
        }
    },

    REMOVE_BASKET: async (context, payload) => {
        if (context.getters.HAS_AUTH) {
            await context.dispatch('SAVE_BASKET_SERVER')
        } else {
            context.commit('CLEAR_BASKET_LOCAL', payload)
        }
    },

    SAVE_BASKET_SERVER: async (context) => {
        if (context.getters.BASKET_IS_NOT_NULL) {
            const products = context.getters.BASKET
            const basketId = context.getters.BASK_ID
            await api.saveBasket(basketId, products)
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
