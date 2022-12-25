<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'App',
  computed: {
    ...mapGetters(['HAS_AUTH'])
  },
  created() {
    if (this.HAS_AUTH) {
      this.$store.dispatch('CHECK_TOKEN')
    }
  }
}
</script>
