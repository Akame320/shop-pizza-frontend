import axios from 'axios'
axios.defaults.withCredentials = true;

export default {
  registration(email, password, role = '') {
    return axios.post('http://localhost:5000/api/user/registration', {
      email,
      password,
      role,
    })
  },
  login(email, password) {
    return axios.post('http://localhost:5000/api/user/login', {
      email,
      password,
    })
  },
  logout() {
    return axios.get('http://localhost:5000/api/user/logout')
  },
  check() {
    return axios.get('http://localhost:5000/api/user/check')
  },
}
