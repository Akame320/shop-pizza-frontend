import Home from "@/views/Home";
import Basket from "@/views/Basket";
import Login from "@/views/auth/Login";
import Registration from "@/views/auth/Registration";
import store from "@/store"
import AdminRegistration from "../views/auth/AdminRegistration";
import Panel from "../views/admin/Panel";
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
        path: '/admin/panel',
        name: 'admin-panel',
        component: Panel,
        beforeEnter: (to, from, next) => {
            console.log(store.getters.HAS_AUTH)
            console.log(store.getters.IS_ADMIN)
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