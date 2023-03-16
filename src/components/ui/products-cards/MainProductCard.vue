<template>
  <li class="product-card">
    <header class="product-card__header">
      <img class="product-card__img" :src="img"/>

      <main class="product-card__main-mobile">
        <div class="product-card__title">{{ product.name }}</div>
        <main class="product-card__main">
          <UIInputItems
              class="product-card__row-type"
              :product-value="product.types"
              :is-multi="false"
              v-model="settings.selectTypeValue"
              :options="addons.types"
          />
          <UIInputItems
              class="product-card__row-size"
              :product-value="product.sizes"
              :is-multi="false"
              v-model="settings.selectSizeValue"
              :options="addons.sizes"
          />
          <template v-if="isAdmin">
            <UIMultiSelect
                placeholder="Категории" :value="product.categories"
                :options="addons.categories"
                :clickable="false"
            />
          </template>
        </main>
      </main>
    </header>
    <main class="product-card__main u-mobile-hidden">
      <UIInputItems
          class="product-card__row-type"
          :product-value="product.types"
          :is-multi="false"
          v-model="settings.selectTypeValue"
          :options="addons.types"
      />
      <UIInputItems
          class="product-card__row-size"
          :product-value="product.sizes"
          :is-multi="false"
          v-model="settings.selectSizeValue"
          :options="addons.sizes"
      />
      <template v-if="isAdmin">
        <UIMultiSelect
            placeholder="Категории" :value="product.categories"
            :options="addons.categories"
            :clickable="false"
        />
      </template>
    </main>
    <footer class="product-card__footer">
      <div class="product-card__price">
        <span>от </span>
        <span>{{ hasProductInBask ? basket.price : sumPrice }} </span>
        <span>₽ </span>
        <span v-show="hasProductInBask" class="product-card__price-small">
          {{ sumPrice }} ₽
        </span>
      </div>
      <template v-if="!isAdmin">
        <div class="product-card__button">
          <button @click="addToBasket" class="button-main"
                  :class="{'--st-active': hasProductInBask}">
            <span>Добавить</span>
            <span v-show="hasProductInBask" class="product-card-count">{{ basket?.count }}</span>
          </button>
        </div>
      </template>
    </footer>
  </li>
</template>

<script>
import { getImgPath } from '../../../utils/servers';

import UIInputItems from "../inputs/UIInputItems";
import UIMultiSelect from "../selects/UIMultiSelect";

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
    basket: {
      type: Object,
      default: () => {
      }
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
  },
  created() {
    this.settings.selectSizeValue = this.searchSmallPriceValue(this.product.sizes)
    this.settings.selectTypeValue = this.searchSmallPriceValue(this.product.types)
  },
  data() {
    return {
      localValue: '',
      settings: {
        selectSizeValue: null,
        selectTypeValue: null
      }
    }
  },
  computed: {
    img() {
      return getImgPath(this.product.img)
    },
    hasProductInBask() {
      return this.basket
    },
    activeSizeElem() {
      return this.product.sizes.find(item => item.value === this.settings.selectSizeValue)
    },
    activeTypeElem() {
      return this.product.types.find(item => item.value === this.settings.selectTypeValue)
    },
    sumPrice() {
      return this.activeSizeElem.price + this.activeTypeElem.price
    },
  },
  methods: {
    searchSmallPriceValue(array) {
      const bySort = array.sort((a, b) => {
        return a.price - b.price
      })
      return bySort[0].value
    },
    addToBasket() {
      this.$emit('add', {
        size: this.activeSizeElem,
        type: this.activeTypeElem,
        id: this.product.id,
        img: this.product.img,
        name: this.product.name
      })
    }
  },
  watch: {
    settings: {
      handler() {
        if (!this.hasProductInBask) return

        this.$emit('updateBask', {
          id: this.product.id,
          type: this.activeTypeElem,
          size: this.activeSizeElem
        })
      },
      deep: true
    }
  }
}
</script>
