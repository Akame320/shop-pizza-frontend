<template>
  <li class="product-card">
    <header class="product-card__header">
      <img class="product-card__img" :src="img"/>
      <div class="product-card__title">{{ product.name }}</div>
    </header>
    <main class="product-card__main">
      <div class="product-card__row-type">
        <div v-for="dough of allDough"
             :key="dough.id"
             class="product-card__item"
             @click="changeActiveDough"
        >
          {{ dough.title }}
        </div>
      </div>
      <ul class="product-card__row-size">
        <li v-for="size of allSizes"
            :key="size.id"
            class="product-card__item"
            :class="{'--active': selectSizeId === size.id, '--has-size': searchSize(size.id)}"
            @click="changeActiveSize(size.id)"
        >
          {{ size.name }}
        </li>
      </ul>
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

export default {
  name: "MainProductCard",
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
  methods: {
    changeActiveDough(newId) {
      if (!this.searchSize(newId)) return this.selectDoughId
      this.selectDoughId = newId
    },
    changeActiveSize(newSizeId) {
      if (!this.searchSize(newSizeId)) return this.selectSizeId
      this.selectSizeId = newSizeId
    },
    searchSize(sizeId) {
      return this.pizzaSizes.find(size => size.id === sizeId)
    }
  }
}
</script>
