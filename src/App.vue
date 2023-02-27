<template>
  <div id="app">
    <router-view></router-view>

    <transition name="top-change-anim">
      <div class="global-error" v-if="GET_ERROR.message">
        {{ GET_ERROR.message }}
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'App',
  computed: {
    ...mapGetters(['HAS_AUTH', 'GET_ERROR'])
  },
  methods: {

  }
}
</script>
