<template>
  <div class="logo" @click="pushHome">
    <div class="logo__icon">
      <img src="/static/img/logos/logo.png" alt="">
    </div>
    <div class="logo__text">
      <span class="logo__title">REACT PIZZA</span>
      <span class="logo__subtitle">{{ subTitle }}</span>
    </div>
  </div>
</template>

<script>
import ROUTES from "../../../router/const"

export default {
  name: "LogoDark",
  props: {
    subTitle: {
      type: String,
      default: 'Самая вкусная пицца во вселенной'
    }
  },
  methods: {
    pushHome() {
      if (this.$route.path === ROUTES.PUBLIC.HOME.path ) return
      this.$router.push(ROUTES.PUBLIC.HOME.path)
    }
  }
}
</script>
