import axios from 'axios'

export default {
  getProducts() {
    return axios.get('http://localhost:5000/api/pizza')
  },
  getAddons() {
    return axios.get('http://localhost:5000/api/addon/')
  },

  saveBasket(basketId, products) {
    return axios.post('http://localhost:5000/api/basket/update', {
      basketId,
      products,
    })
  },

  createNewPizza(formData) {
    return axios.post('http://localhost:5000/api/pizza', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  updatePizza(formData) {
    return axios.put('http://localhost:5000/api/pizza', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  updateAddons(data) {
    return axios.post('http://localhost:5000/api/addon/update', data)
  },

  deleteProduct(id) {
    return axios.delete(`http://localhost:5000/api/pizza/${id}`)
  },
}
