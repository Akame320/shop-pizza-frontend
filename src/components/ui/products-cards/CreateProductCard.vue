<template>
  <li class="create-pizza-card" >
    <ProductCardEditBoards
      :addons="addons"
      :product="form"
      save-btn-text="СОЗДАТЬ"
      @save="saveHandler"
    />
  </li>
</template>

<script>

import ProductCardEditBoards from "./ProductCardEditBoards";
import { convertAddonToForm } from "./utilites";

export default {
  name: "CreateProductCard",
  components: {
    ProductCardEditBoards
  },
  props: {
    addons: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      errors: false,
      form: {
        img: null,
        sizes: convertAddonToForm(this.addons.sizes),
        types: convertAddonToForm(this.addons.types),
        categories: [],
        name: ''
      }
    }
  },
  methods: {
    saveHandler(product) {
      this.$emit('create', product)
    },
  }
}
</script>
