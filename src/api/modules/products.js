import axios from 'axios'

export default {
    getProducts() {
        return axios.get('http://localhost:5000/api/pizza')
    },
    getSizes() {
        return axios.get('http://localhost:5000/api/size')
    },

    getCategories() {
        return axios.get('http://localhost:5000/api/categories')
    },

    saveBasket(basketId, products) {
        return axios.post('http://localhost:5000/api/basket/update', {
            basketId, products
        })
    },

    getDoughs() {
        return axios.get('http://localhost:5000/api/dough')
    },

    saveProducts() {
    },

    removeProducts() {
    },
}