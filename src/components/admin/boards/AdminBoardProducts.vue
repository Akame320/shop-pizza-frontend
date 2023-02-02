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
      <CreateProductCard
          v-if="hasCreatedPizza"
          :default-edit="true"
          :sizes="sizes"
          :dough="doughs"
          :categories="categories"
          @update="createPizza"
      />

      <AdminProductCard
          v-for="product of products"
          :key="product.title"
          :product="product"
          :all-sizes="sizes"
          :all-dough="doughs"
          :all-categories="categories"
          @update="updatePizza"
      />
    </ul>
  </div>
</template>

<script>
import UIButton from "../../ui/buttons/UIButton";
import AdminProductCard from "../../ui/products-cards/AdminProductCard";
import CreateProductCard from "../../ui/products-cards/CreateProductCard";

export default {
  name: "AdminBoardProducts",
  components: {
    UIButton,
    AdminProductCard,
    CreateProductCard
  },
  data() {
    return {
      hasCreatedPizza: false,
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
    },
    createPizza(pizza) {
      const formData = new FormData()
      formData.append('img', pizza.img)
      formData.append('name', pizza.name)
      formData.append('price', pizza.price)

      this.$store.dispatch('CREATE_PIZZA', formData)
    },
    updatePizza(pizza) {
      const formData = new FormData()
      formData.append('id', pizza.id)
      formData.append('img', pizza.img)
      formData.append('name', pizza.name)
      formData.append('price', pizza.price)
      formData.append('sizesId', pizza.sizes)
      formData.append('categoriesId', pizza.categories)
      formData.append('doughsId', pizza.doughs)

      this.$store.dispatch('UPDATE_PIZZA', formData)
    }
  },
}
</script>