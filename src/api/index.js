import productsApi from './modules/products'
import authApi from './modules/auth'

export default Object.assign(authApi, productsApi)