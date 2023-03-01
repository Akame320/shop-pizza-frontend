import api from '../../api/index'

const state = {
    products: [],
    basket: [],
    addons: {
        categories: [],
        types: [],
        sizes: []
    },
}

const getters = {
    PRODUCTS: state => {
        return state.products
    },

    ADDONS: state => {
        return state.addons
    },

    GET_BASKET: state => {
        return state.basket
    },

    BASKET_SUM: state => {
        return state.basket.reduce((sum, product) => sum + product.price, 0)
    },

    BASKET_COUNT: state => {
        return state.basket.reduce((sum, product) => sum + product.count, 0)
    }
}

const mutations = {
    SET_PRODUCTS: (state, payload) => {
        state.products = payload
    },

    SAVE_ADDONS: (state, payload) => {
        state.addons = Object.assign({}, payload)
    },

    BASK_ADD_PRODUCT: (state, payload) => {
        const candidate = {
            ...payload,
            count: 1,
            price: payload.size.price + payload.type.price
        }
        state.basket.push(candidate)
    },

    BASK_PRODUCT_INCREMENT: (state, payload) => {
        const searchedItem = state.basket.find(item => item.id === payload.id)

        searchedItem.count += 1
        searchedItem.price = (searchedItem.size.price + searchedItem.type.price) * searchedItem.count
    },

    BASK_PRODUCT_DECREMENT: (state, payload) => {
        const searchedItem = state.basket.find(item => item.id === payload.id)

        searchedItem.count -= 1
        searchedItem.price = (searchedItem.size.price + searchedItem.type.price) * searchedItem.count
    },

    BASK_PRODUCT_UPDATE: (state, payload) => {
        const searchedItem = state.basket.find(item => item.id === payload.id)

        searchedItem.type = payload.type
        searchedItem.size = payload.size
        searchedItem.price = (payload.size.price + payload.type.price) * searchedItem.count
    },

    BASKET_PRODUCT_CLEAR: (state, payload) => {
        const searchedItemIndex = state.basket.findIndex(item => item.id === payload.id)
        state.basket.splice(searchedItemIndex, 1)
    },

    BASKET_CLEAR: (state) => {
        state.basket.splice(0, state.basket.length )
    }
}

const actions = {
    GET_PRODUCTS: async (context) => {
        const res = await api.getProducts()
        const { data } = res
        context.commit('SET_PRODUCTS', data);
        return res
    },

    GET_ADDONS: async (context) => {
        const { data } = await api.getAddons()
        context.commit('SAVE_ADDONS', data)
    },

    GET_DATA: async (context) => {
        await context.dispatch('GET_PRODUCTS')
        await context.dispatch('GET_ADDONS')
    },

    CREATE_PIZZA: async (context, payload) => {
        const promise = await api.createNewPizza(payload)
        context.commit('SET_PRODUCTS', promise.data)
        return promise
    },

    UPDATE_PIZZA: async (context, payload) => {
        const { data } = await api.updatePizza(payload)
        context.commit('SET_PRODUCTS', data)
    },

    UPDATE_ADDONS: async (context, payload) => {
        const res = await api.updateAddons(payload)
        context.commit('SAVE_ADDONS', res.data)
    },

    DELETE_PRODUCT: async (context, payload) => {
        const promise = await api.deleteProduct(payload)
        context.commit('SET_PRODUCTS', promise.data)

        return promise
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
