import store from "@/store"
import ROUTES from "./const"

export default {
    isAuth(to, from, next) {
        next(store.getters.HAS_AUTH)
    },
    isAdmin(to, from, next) {
        if (store.getters.HAS_AUTH && store.getters.IS_ADMIN) {
            next()
        } else {
            next({ name: ROUTES.PUBLIC.HOME.name })
        }
    },
    isNotAuth(to, from, next) {
        if (!store.getters.HAS_AUTH) {
            next()
        } else {
            next({name: ROUTES.PUBLIC.HOME.name})
        }
    },
    async checkToken(to, from, next) {
        if (localStorage.getItem('token')) {
            await store.dispatch('CHECK_TOKEN')
        }

        next()
    }
}