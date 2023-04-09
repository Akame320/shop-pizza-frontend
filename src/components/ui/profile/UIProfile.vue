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
        <UIIcon name="menu" :styles="['sz-20-20', 'fill-accept']"/>
      </button>
    </aside>

    <ul class="avatar-block__list">
      <li
          v-for="nav of listNav"
          :key="nav.title"
          class="avatar-block__option"
          @click="nav.onClick"
      >
        <UIIcon
            :styles="nav.icon.styles"
            :circle="nav.icon.circle"
            :name="nav.icon.name"
        />
        <span>{{nav.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { directive } from 'v-click-outside'
import UIIcon from '@/components/ui/icons/UIIcon'
import routes from '@/router/const.js'
import { mapGetters } from "vuex";

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
      default: () => {
      },
    },
  },
  computed: {
    ...mapGetters('IS_ADMIN'),
    isAdmin() {
      return this.IS_ADMIN
    },
    listNav() {
      const nav = []

      if (this.IS_ADMIN) {
        nav.push({
          title: 'Админ панель',
          icon: { name: 'user', styles: ['sz-20-20', 'mr-10', 'fill-accept'] },
          onClick: () => {
            this.$router.push(this.routes.ADMIN.PRODUCTS.path)
          }
        })
      }

      if (!this.IS_ADMIN) {
        nav.push({
          title: 'Корзина',
          icon: {
            name: 'basket-fill',
            styles: ['sz-11-11', 'fill-white'],
            circle: ['sz-20-20', 'mr-10', 'fill-accept']
          },
          onClick: () => {
            this.$router.push(this.routes.PUBLIC.BASKET.path)
          }
        })
      }

      nav.push({
        title: 'Выйти',
        icon: {
          name: 'logout',
          circle: ['sz-20-20', 'mr-10', 'fill-accept']
        },
        onClick: this.logout
      })

      return nav
    }
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
