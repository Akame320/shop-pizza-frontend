import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './pages'
import store from "@/store"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(async (to, from, next) => {
    if (localStorage.getItem('token')) {
        await store.dispatch('CHECK_TOKEN')
    }
    next()
})

export default router
