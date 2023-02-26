<template>
  <li class="product-card">
    <header class="product-card__header">
      <img class="product-card__img" :src="img"/>
      <div class="product-card__title">{{ product.name }}</div>
    </header>
    <main class="product-card__main">
      <UIInputItems class="product-card__row-type" :is-multi="false" v-model="selectTypeValue" :options="addons.types"/>
      <UIInputItems class="product-card__row-size" :is-multi="false" v-model="selectSizeValue" :options="addons.sizes"/>
    </main>
    <footer class="product-card__footer">
      <div class="product-card__price">от {{ counts > 0 ? sumPrice : typePrice + sizePrice }} ₽</div>
      <div class="product-card__button">
        <button @click="$emit('add', { size: selectSizeValue, dough: selectTypeValue })" class="button-main"
                :class="{'--st-active': hasProductInBask}">
          <span>Добавить</span>
          <span v-show="hasProductInBask" class="product-card-count">{{ counts }}</span>
        </button>
      </div>
    </footer>
  </li>
</template>

<script>

import UIInputItems from "../inputs/UIInputItems";

/**
 * Обычная
 * 400
 * 450
 * 500
 *
 * Сырный
 * 500
 * 550
 * 600
 */

export default {
  name: "MainProductCard",
  components: {
    UIInputItems
  },
  props: {
    product: {
      type: Object,
      default: () => {
      }
    },
    addons: {
      type: Object,
      default: () => {
      }
    },
    counts: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.selectSizeValue = this.searchSmallPriceValue(this.product.sizes)
    this.selectTypeValue = this.searchSmallPriceValue(this.product.types)
  },
  data() {
    return {
      localValue: '',
      selectSizeValue: null,
      selectTypeValue: null
    }
  },
  computed: {
    img() {
      return 'http://localhost:5000/' + this.product.img
    },
    pizzaSizes() {
      return this.product.sizes
    },
    hasProductInBask() {
      return this.counts > 0
    },
    sizePrice() {
      return this.product.sizes.find(item => item.value === this.selectSizeValue)?.price
    },
    typePrice() {
      return this.product.types.find(item => item.value === this.selectTypeValue)?.price
    },
    sumPrice() {
      return this.counts * (this.typePrice + this.sizePrice)
    }
  },
  methods: {
    searchSmallPriceValue(array) {
      const bySort = array.sort((a, b) => {
        return a.price - b.price
      })
      return bySort[0].value
    }
  }
}
</script>
