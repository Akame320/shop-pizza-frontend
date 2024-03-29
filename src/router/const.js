export default {
  ADMIN: {
    PRODUCTS: {
      path: '/admin/panel',
      name: 'admin-panel',
    },
    REGISTRATION: {
      path: '/auth/admin/registration',
      name: 'admin-registration',
    },
    SETTINGS: {
      path: '/admin/settings',
      name: 'admin-settings',
    },
  },
  PUBLIC: {
    HOME: {
      path: '/',
      name: 'home',
    },
    BASKET: {
      path: '/basket',
      name: 'basket',
    },
  },
  AUTH: {
    LOGIN: {
      path: '/auth/login',
      name: 'login',
    },
    REGISTRATION: {
      path: '/auth/registration',
      name: 'registration',
    },
  },
  ERRORS: {
    NOT_FOUND: {
      path: '/errors/404',
      name: 'error-404',
    },
  },
}
