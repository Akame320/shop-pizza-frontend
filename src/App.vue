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
}
</script>
