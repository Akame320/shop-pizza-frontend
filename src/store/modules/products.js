import api from '../../api/index'

const state = {
    products: [],
    basket: [],
    addons: {},
}

const getters = {
    PRODUCTS: state => {
        return state.products
    },

    ADDONS: state => {
        return state.addons
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
        if (payload) {
            const { id } = payload
            const idx = state.basket.findIndex(basketItem => basketItem.id === id)
            state.basket.splice(idx, 1)
            return
        }

        const length = state.basket.length
        state.basket.splice(0, length)
    },

    SAVE_ADDONS: (state, payload) => {
        state.addons = Object.assign(payload)
    }
}

const actions = {
    GET_PRODUCTS: async (context) => {
        const res = await api.getProducts()
        const { data } = res
        context.commit('SET_PRODUCTS', data);
        return res
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
    },

    CREATE_PIZZA: async (context, payload) => {
        await api.createNewPizza(payload)
    },

    UPDATE_PIZZA: async (context, payload) => {
        const updatedProducts = await api.updatePizza(payload)
        context.commit('SET_PRODUCTS', updatedProducts.data)
    },

    GET_DATA: async (context) => {
        await context.dispatch('GET_PRODUCTS')
        await context.dispatch('GET_ADDONS')
    },

    UPDATE_ADDONS: async (context, payload) => {
        const res = await api.updateAddons(payload)
        context.commit('SAVE_ADDONS', res.data)
    },

    GET_ADDONS: async (context) => {
        const { data } = await api.getAddons()
        context.commit('SAVE_ADDONS', data)
    },

    DELETE_PRODUCT: async (context, payload) => {
        const { data } = await api.deleteProduct(payload)
        context.commit('SET_PRODUCTS', data)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
