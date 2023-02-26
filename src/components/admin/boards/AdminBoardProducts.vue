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
          :addons="addons"
          @create="createPizza"
      />

      <AdminProductCard
          v-for="product of products"
          :key="product.title"
          :product="product"
          :addons="addons"
          @update="updatePizza"
          @delete="deleteProduct"
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
    addons: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    addNewPizza() {
      this.hasCreatedPizza = true
    },
    createPizza(pizza) {
      const convertPizza = {...pizza}
      convertPizza.sizes = this.convertAddonToServer(pizza.sizes)
      convertPizza.types = this.convertAddonToServer(pizza.types)

      const formData = new FormData()
      for ( let key in pizza ) formData.append(key, pizza[key])

      this.$store.dispatch('CREATE_PIZZA', formData)
    },
    updatePizza(pizza) {
      const formData = new FormData()
      for ( let key in pizza ) formData.append(key, pizza[key])

      this.$store.dispatch('UPDATE_PIZZA', formData)
    },
    deleteProduct(id) {
      this.$store.dispatch('DELETE_PRODUCT', id)
    },
    convertAddonToServer(addon) {
      const filterAddons = addon.filter((item) => {
        return item.isActive
      })
      const deleteUnusedProps = filterAddons.map(item => {
        return {
          id: item.id,
          price: item.price
        }
      })
      return JSON.stringify(deleteUnusedProps)
    },
  },
}
</script>