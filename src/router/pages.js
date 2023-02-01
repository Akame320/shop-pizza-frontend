import Home from "@/views/Home";
import Basket from "@/views/Basket";
import Login from "@/views/auth/Login";
import Registration from "@/views/auth/Registration";
import store from "@/store"
import AdminRegistration from "../views/auth/AdminRegistration";
import Panel from "../views/admin/Products";
import NotFound from "../views/errors/NotFound";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/basket',
        name: 'Basket',
        component: Basket
    },
    {
        path: '/auth/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/auth/registration',
        name: 'Registration',
        component: Registration,
        beforeEnter: (to, from, next) => {
            if (store.getters.HAS_AUTH) {
                next({name: 'Home'})
            } else {
                next()
            }
        },
    },
    {
        path: '/auth/admin/registration',
        name: 'admin-registration',
        component: AdminRegistration,
    },
    {
        path: '/admin/products',
        name: 'admin-products',
        component: Panel,
        beforeEnter: (to, from, next) => {
            if (store.getters.HAS_AUTH && store.getters.IS_ADMIN) {
                next()
            } else {
                next({name: 'error-404'})
            }
        },
    },
    {
        path: '/errors/404',
        name: 'error-404',
        component: NotFound,
    },
]



export default routes