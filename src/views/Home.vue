<template>
  <LayoutPublic>
    <div class="products-page-settings">
      <UITabsButton v-model="filterCategorise" :categories="categories"/>
      <UIFilterSelect :options="sortOptions" v-model="sorting"/>
    </div>

    <div class="products-page__title-wrapper">
      <h1 class="products-page__title">
        Все пиццы
      </h1>
    </div>

    <AppProductBoard :products="products" :addons="ADDONS" @addCount="addCount" @updateBask="updateBasket"/>
  </LayoutPublic>
</template>

<script>
import { mapGetters } from "vuex";

import LayoutPublic from "../layouts/LayoutPublic";
import UIFilterSelect from "../components/ui/selects/UIFilterSelect";
import UITabsButton from "../components/ui/tabs/UITabsButton";
import AppProductBoard from "../components/home/AppProductBoard";

const SORT_PRICE = {
  title: 'по Цене',
  value: 'PRICE',
}

const SORT_ALPHABET = {
  title: 'по Названию',
  value: 'NAME',
}

const SORTING_OPTIONS = [SORT_ALPHABET, SORT_PRICE]

const INITIAL_SORTING = SORTING_OPTIONS[0].value

const FILTER_ALL_OPTION = {
  value: 0,
  title: 'Все'
}

export default {
  name: "Home",
  components: {
    LayoutPublic,
    UIFilterSelect,
    UITabsButton,
    AppProductBoard
  },
  created() {
    this.$store.dispatch('GET_PRODUCTS');
    this.$store.dispatch('GET_ADDONS');
  },
  data() {
    return {
      filterCategorise: [FILTER_ALL_OPTION.value],
      sorting: INITIAL_SORTING
    }
  },
  computed: {
    ...mapGetters(['PRODUCTS', 'ADDONS', 'HAS_AUTH', 'GET_BASKET']),
    categories() {
      const list = [...this.ADDONS.categories || []]
      list.unshift(FILTER_ALL_OPTION)

      return list
    },
    sortOptions() {
      return [...SORTING_OPTIONS]
    },
    filterProducts() {
      if (this.filterCategorise.includes(FILTER_ALL_OPTION.value)) {
        return this.PRODUCTS
      }

      return this.PRODUCTS.filter(product => {
        for (const category of product.categories) {
          return this.filterCategorise.includes(category)
        }
      })
    },
    sortByName() {
      const sortProducts = [...this.filterProducts]
      return sortProducts.sort()
    },
    sortByPrice() {
      const sortProducts = [...this.filterProducts]
      return sortProducts.sort((a, b) => {
        const minPriceA = a.sizes[0].price + a.types[0].price
        const minPriceB = b.sizes[0].price + b.types[0].price

        return minPriceA - minPriceB
      })
    },
    products() {
      switch (this.sorting) {
        case SORT_ALPHABET.value :
          return this.sortByName
        case SORT_PRICE.value :
          return this.sortByPrice
        default :
          return this.filterProducts
      }
    }
  },
  methods: {
    addCount(data) {
      const hasProductInBasket = this.GET_BASKET.find(item => item.id === data.id)

      if (hasProductInBasket) {
        this.$store.commit('BASK_PRODUCT_INCREMENT', data)
      } else {
        this.$store.commit('BASK_ADD_PRODUCT', data)
      }
    },
    updateBasket(data) {
      this.$store.commit('BASK_PRODUCT_UPDATE', data)
    }
  }
}
</script>
