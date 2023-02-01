<template>
  <li class="product-card">
    <header class="product-card__header">
      <img class="product-card__img" :src="img"/>
      <div class="product-card__title">{{ product.name }}</div>
    </header>
    <main class="product-card__main">
      <UIInputItems class="product-card__row-type" :is-multi="false" v-model="selectDoughId" :options="allDough" />
      <UIInputItems class="product-card__row-size" :is-multi="false" v-model="selectSizeId" :options="allSizes" />
    </main>
    <footer class="product-card__footer">
      <div class="product-card__price">от {{ product.price }} ₽</div>
      <div class="product-card__button">
        <button @click="$emit('add', { size: selectSizeId, dough: selectDoughId })" class="button-main"
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
    allSizes: {
      type: Array,
      default: () => []
    },
    allDough: {
      type: Array,
      default: () => []
    },
    counts: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      localValue: '',
      selectSizeId: 1,
      selectDoughId: 1
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
    }
  },
}
</script>
