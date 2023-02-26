<template>
  <LayoutPublic>
    <div class="products-page-settings">
      <ul class="categories-tabs">
        <li v-for="cat of categories"
            :key="cat.id"
            class="categories-tabs-item"
            :class="categoriesStyles(cat.id)"
            @click="toggleCategories(cat.id)"
        >
          {{ cat.value }}
        </li>
      </ul>

      <UIFilterSelect @input="sortHandler" :options="sortOptions" :value="sort"/>
    </div>

    <div class="products-page__title-wrapper">
      <h1 class="products-page__title">
        Все пиццы
      </h1>
    </div>

    <ul class="products-cards-list">
      <MainProductCard
          v-for="pizza of PRODUCTS"
          :addons="ADDONS"
          :key="pizza.name"
          :product="pizza"
          :counts="getCounts(pizza.id)"
          @add="updateBasket"
      />
    </ul>
  </LayoutPublic>
</template>

<script>
import MainProductCard from '../components/ui/products-cards/MainProductCard.vue'
import { mapGetters } from "vuex";
import LayoutPublic from "../layouts/LayoutPublic";
import UIFilterSelect from "../components/ui/selects/UIFilterSelect";

const SORTING_OPTIONS = [
  {
    title: 'по цене',
    value: 'price',
  }, {
    title: 'по алфавиту',
    value: 'alphabet',
  }
]

export default {
  name: "Home",
  components: {
    MainProductCard,
    LayoutPublic,
    UIFilterSelect
  },
  computed: {
    ...mapGetters(['PRODUCTS', 'ADDONS', 'HAS_AUTH', 'BASKET']),
    categories() {
      const list = [...this.ADDONS.categories || []]
      list.unshift({ id: 0, value: 'Все' })
      return list
    },
    hasAllSelectedCategories() {
      return this.categories.length === this.filterCategorise.length
    },
    sortOptions() {
      return SORTING_OPTIONS.slice(0)
    }
  },
  data() {
    return {
      pizzas: [],
      filterCategorise: [],
      sort: 'price'
    }
  },
  methods: {
    toggleCategories(catId) {
      if (catId === 0) {
        this.filterCategorise = this.categories.map(cat => cat.id)
      } else {
        const indexCat = this.filterCategorise.findIndex(cat => cat === catId)
        if (indexCat === -1) this.filterCategorise.push(catId)
        else this.filterCategorise.splice(indexCat, 1)
      }

      if (!this.hasAllSelectedCategories) {
        const indexCat = this.filterCategorise.findIndex(cat => cat === 0)
        if (indexCat !== -1) this.filterCategorise.splice(indexCat, 1)
      }
    },
    categoriesStyles(catId) {
      return { '--st-selected': this.filterCategorise.includes(catId) }
    },
    sortHandler(value) {
      this.sort = value
    },
    updateBasket(id) {
      this.$store.dispatch('INCREMENT_BASKET', { id });
    },
    getCounts(id) {
      const { count } = this.BASKET.find(product => product.id === id) || 0
      return count
    }
  },
  mounted() {
    this.$store.dispatch('GET_PRODUCTS');
    this.$store.dispatch('GET_ADDONS');
  }
}
</script>
