import ROUTES from './const'
import routeMiddleware from './middleware'

import Home from '@/views/Home'
import Basket from '@/views/Basket'
import Login from '@/views/auth/Login'
import Registration from '@/views/auth/Registration'
import AdminRegistration from '../views/auth/AdminRegistration'
import Panel from '../views/admin/Panel'
import NotFound from '../views/errors/NotFound'

const routes = [
  // PUBLIC
  {
    path: ROUTES.PUBLIC.HOME.path,
    name: ROUTES.PUBLIC.HOME.name,
    component: Home,
  },
  {
    path: ROUTES.PUBLIC.BASKET.path,
    name: ROUTES.PUBLIC.BASKET.name,
    component: Basket,
  },

  // AUTH
  {
    path: ROUTES.AUTH.LOGIN.path,
    name: ROUTES.AUTH.LOGIN.name,
    component: Login,
    beforeEnter: routeMiddleware.isNotAuth,
  },
  {
    path: ROUTES.AUTH.REGISTRATION.path,
    name: ROUTES.AUTH.REGISTRATION.name,
    component: Registration,
    beforeEnter: routeMiddleware.isNotAuth,
  },

  // ADMIN
  {
    path: ROUTES.ADMIN.REGISTRATION.path,
    name: ROUTES.ADMIN.REGISTRATION.name,
    component: AdminRegistration,
  },
  {
    path: ROUTES.ADMIN.PRODUCTS.path,
    name: ROUTES.ADMIN.PRODUCTS.name,
    component: Panel,
    beforeEnter: routeMiddleware.isAdmin,
  },

  // 404
  {
    path: ROUTES.ERRORS.NOT_FOUND.path,
    name: ROUTES.ERRORS.NOT_FOUND.name,
    component: NotFound,
  },
]

export default routes
