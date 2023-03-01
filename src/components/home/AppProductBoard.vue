<template>
  <ul class="products-cards-list">
    <MainProductCard
        v-for="pizza of products"
        :key="pizza.name"
        :product="pizza"
        :addons="addons"
        :basket="getBasket(pizza.id)"
        @add="addToBasket"
        @updateBask="updateBasket"
    />
  </ul>
</template>

<script>
import MainProductCard from "../ui/products-cards/MainProductCard";
import { mapGetters } from "vuex";

export default {
  name: "AppProductBoard",
  components: {
    MainProductCard
  },
  props: {
    products: {
      type: Array,
      default: () => []
    },
    addons: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['GET_BASKET']),
  },
  methods: {
    getBasket(id) {
      return this.GET_BASKET.find(item => item.id === id)
    },
    addToBasket(data) {
      this.$emit('addCount', data)
    },
    updateBasket(data) {
      this.$emit('updateBask', data)
    }
  }
}
</script>
