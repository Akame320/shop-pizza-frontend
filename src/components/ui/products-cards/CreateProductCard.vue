<template>
  <li class="create-pizza-card" >
    <ProductCardEditBoards
      :addons="addons"
      :product="formFormat"
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
        sizes: [],
        types: [],
        categories: [],
        name: ''
      }
    }
  },
  computed: {
    formFormat() {
      const newForm = {...this.product}
      newForm.sizes = convertAddonToForm(this.addons.sizes)
      newForm.types = convertAddonToForm(this.addons.types)

      return newForm
    }
  },
  methods: {
    saveHandler(product) {
      this.$emit('create', product)
    },
  }
}
</script>
