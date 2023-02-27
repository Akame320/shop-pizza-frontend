import Vue from 'vue'
import Vuex from 'vuex'

import products from "@/store/modules/products";
import user from "@/store/modules/user";
import system from "@/store/modules/system";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    products,
    user,
    system
  }
})
