<template>
  <div
    class="avatar-block"
    v-click-outside="hideList"
    :class="{ '--st-opened': opened }"
  >
    <main class="avatar-block__main">
      <h4 class="avatar-block__name">Anton Petrov</h4>
      <span class="avatar-block__role">Admin</span>
    </main>
    <aside class="avatar-block__aside">
      <div class="avatar-block__avatar"></div>
      <div class="avatar-block__initials">A.P.</div>

      <button @click="toggle" class="avatar-block__arrow">
        <UIIcon name="menu" :styles="['sz-20-20', 'fill-accept']" />
      </button>
    </aside>

    <ul class="avatar-block__list">
      <li
        class="avatar-block__option"
        @click="$router.push(routes.ADMIN.PRODUCTS.path)"
      >
        <UIIcon :styles="['sz-20-20', 'mr-10', 'fill-accept']" name="user" />
        <span>Админ панель</span>
      </li>
      <li
        class="avatar-block__option"
        @click="$router.push(routes.PUBLIC.BASKET.path)"
      >
        <UIIcon
          :styles="['sz-11-11', 'fill-white']"
          :circle="['sz-20-20', 'mr-10', 'fill-accept']"
          name="basket-fill"
        />
        <span>Корзина</span>
      </li>
      <li class="avatar-block__option" @click="logout">
        <UIIcon :styles="['sz-20-20', 'mr-10', 'fill-accept']" name="logout" />
        <span>Выйти</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { directive } from 'v-click-outside'
import UIIcon from '@/components/ui/icons/UIIcon'
import routes from '@/router/const.js'

export default {
  name: 'UIProfile',
  directives: {
    clickOutside: directive,
  },
  components: {
    UIIcon,
  },
  props: {
    profile: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      opened: false,
      routes: routes,
    }
  },
  methods: {
    toggle() {
      this.opened = !this.opened
    },
    hideList() {
      this.opened = false
    },
    logout() {
      this.$store.dispatch('LOGOUT')
    },
  },
}
</script>
