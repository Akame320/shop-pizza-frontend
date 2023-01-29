<template>
  <div class="admin-products">
    <div class="admin-products__settings">
      <ul class="admin-products-actions">
        <!-- Action -:- Import -->
        <li class="admin-products-actions__item">
          <UIButton
              @click="$emit('import-csv')"
              :styles="['th-orange']"
          >
            <span class="u-text-uppercase">Импорт csv</span>
          </UIButton>
        </li>

        <!-- Action -:- Create -->
        <li class="admin-products-actions__item">
          <UIButton
              @click="addNewPizza"
              class="admin-products-btn-add"
              :styles="['th-black']"
          >
            <span class="u-text-uppercase">Добавить пиццу</span>
          </UIButton>
        </li>
      </ul>
    </div>
    <ul class="admin-products__products-list">
      <AdminProductCard
          v-for="product of products"
          :key="product.title"
          :product="product"
          :allSizes="sizesOptions"
          :allDough="doughsOptions"
          :allCategories="categoriesOptions"
      />
      <AdminProductCard v-if="hasCreatedPizza" />
    </ul>
  </div>
</template>

<script>
import UIButton from "../../ui/buttons/UIButton";
import AdminProductCard from "../../ui/products-cards/AdminProductCard";

export default {
  name: "AdminBoardProducts",
  components: {
    UIButton,
    AdminProductCard
  },
  data() {
    return {
      hasCreatedPizza: false,
      createdProduct: {
        img: '',
        title: '',
        sizes: [],
        doughs: [],
        price: 0
      }
    }
  },
  props: {
    products: {
      type: Array,
      default: () => []
    },
    sizes: {
      type: Array,
      default: () => []
    },
    categories: {
      type: Array,
      default: () => []
    },
    doughs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    addNewPizza() {
      this.hasCreatedPizza = true
    }
  },
  computed: {
    categoriesOptions() {
      return this.categories.map(item => {
        return {title: item.name, value: item.name.toUpperCase()}
      })
    },
    sizesOptions() {
      return this.sizes.map(item => {
        return {title: item.name, value: item.name.toUpperCase()}
      })
    },
    doughsOptions() {
      return this.doughs.map(item => {
        return {title: item.name, value: item.name.toUpperCase()}
      })
    }
  }
}
</script>