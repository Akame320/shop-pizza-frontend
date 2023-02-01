export default {
    ADMIN: {
        PRODUCTS: {
            path: '/admin/products',
            name: 'admin-products'
        },
        REGISTRATION: {
            path: '/auth/admin/registration',
            name: 'admin-registration',
        }
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
        }
    }
}
