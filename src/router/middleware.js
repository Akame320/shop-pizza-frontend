import store from '@/store'
import ROUTES from './const'

const MIN_WIDTH_DEVICE_FOR_ADMIN = 1024

export default {
    isAuth(to, from, next) {
        next(store.getters.HAS_AUTH)
    },
    adminValidator(to, from, next) {
        const isNotValidate = window.innerWidth < MIN_WIDTH_DEVICE_FOR_ADMIN
        if (isNotValidate) next({ name: ROUTES.ERRORS.NOT_FOUND.name })

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
            next({ name: ROUTES.PUBLIC.HOME.name })
        }
    },
    async checkToken(to, from, next) {
        if (localStorage.getItem('token')) {
            await store.dispatch('CHECK_TOKEN')
        }

        next()
    },
}

/**
 *
 * Перед запуском приложения
 *
 * Условия.
 * - Мы можем быть на auth странице
 * - Мы можем быть на паблик странице
 * - Юзер может быть авторизован
 *
 * Как решить?
 * Проверить есть ли токен, Если есть отправляем на валидацию
 * Если его нет. -> Смотрим может ли быть пользователь тут без токена?
 * - Да ? Оставляем
 * - Нет ? Перенаправляем на home
 *
 *
 * Если токен есть. -> Отправляем на бэк
 * - Валидный ? Оставляем
 * - Не валидный ? Возвращаемся к шагу если нет токена
 */