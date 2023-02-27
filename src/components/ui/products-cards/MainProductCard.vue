<template>
  <li class="product-card">
    <header class="product-card__header">
      <img class="product-card__img" :src="img"/>
      <div class="product-card__title">{{ product.name }}</div>
    </header>
    <main class="product-card__main">
      <UIInputItems class="product-card__row-type" :product-value="product.types" :is-multi="false" @input="(val) => selectTypeValue = val" :value="activeType" :options="addons.types"/>
      <UIInputItems class="product-card__row-size" :product-value="product.sizes" :is-multi="false" @input="(val) => selectSizeValue = val" :value="activeSize" :options="addons.sizes"/>
      <template v-if="isAdmin">
        <UIMultiSelect :options="addons.categories" placeholder="Категории" :value="product.categories"
                       :clickable="false" />
      </template>
    </main>
    <footer class="product-card__footer">
      <div class="product-card__price">от {{ counts > 0 ? sumPrice : typePrice + sizePrice }} ₽</div>
      <template v-if="!isAdmin">
        <div class="product-card__button">
          <button @click="$emit('add', { size: selectSizeValue, dough: selectTypeValue })" class="button-main"
                  :class="{'--st-active': hasProductInBask}">
            <span>Добавить</span>
            <span v-show="hasProductInBask" class="product-card-count">{{ counts }}</span>
          </button>
        </div>
      </template>
    </footer>
  </li>
</template>

<script>

import UIInputItems from "../inputs/UIInputItems";
import UIMultiSelect from "../selects/UIMultiSelect";

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
    UIInputItems,
    UIMultiSelect
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
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
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
      return this.product.sizes.find(item => item.value === this.activeSize)?.price
    },
    typePrice() {
      return this.product.types.find(item => item.value === this.activeType)?.price
    },
    sumPrice() {
      return this.counts * (this.typePrice + this.sizePrice)
    },
    activeSize() {
      return this.selectSizeValue ? this.selectSizeValue : this.searchSmallPriceValue(this.product.sizes)
    },
    activeType() {
      return this.selectTypeValue ? this.selectTypeValue : this.searchSmallPriceValue(this.product.types)
    }
  },
  methods: {
    searchSmallPriceValue(array) {
      const bySort = array.sort((a, b) => {
        return a.price - b.price
      })
      return bySort[0].value
    }
  },
}
</script>
