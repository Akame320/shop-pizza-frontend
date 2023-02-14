<template>
  <li class="admin-product-card --th-edit">
    <!-- BUTTONS -->
    <div class="admin-product-card__action-top">
      <button @click="saveChanges" class="admin-product-card__btn-top">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="64px" height="64px" viewBox="0 0 64 64">
          <g id="circle_copy_4_3_">
            <path d="M32,0C14.327,0,0,14.327,0,32c0,17.674,14.327,32,32,32s32-14.326,32-32C64,14.327,49.673,0,32,0z M28.222,41.191
					L28,40.971l-0.222,0.223l-8.971-8.971l1.414-1.415L28,38.586l15.777-15.778l1.414,1.414L28.222,41.191z"/>
          </g>
        </svg>
      </button>
    </div>

    <!-- TITLE + IMG -->
    <header class="admin-product-card__header">
      <div class="admin-product-card__img-wrapper">
        <div class="admin-product-card-placeholder-img" />
        <div class="admin-product-card__uploader">
          <UIUploader :btn-text="btnText" :styles="['not-dragged']" @input="(file) => v$.form.img.$model = file"/>
        </div>
      </div>
      <div class="admin-product-card__title-wrapper">
        <div class="admin-product-card__title-input">
          <input type="text" v-model="v$.form.name.$model" class="admin-product-card-input">
        </div>
      </div>
    </header>

    <!-- SETTINGS -->
    <main class="product-card__main">
      <UIInputItems class="product-card__row-type" v-model="v$.form.types.$model" :options="addons.types" />
      <UIInputItems class="product-card__row-size" v-model="v$.form.sizes.$model" :options="addons.sizes" />
      <UIMultiSelect
          class="product-card__row-categories"
          placeholder="Выберите категории"
          :options="addons.categories"
          v-model="v$.form.categories.$model"/>
    </main>

    <!-- PRICE -->
    <footer class="admin-product-card__footer">
      <div class="admin-product-card__price">
        <span class="product-card-title">от</span>
        <span class="admin-product-card__price-input">
           <input type="number" v-model="v$.form.price.$model"
                  class="admin-product-card-input">
        </span>
        <span class="product-card-title">₽</span>
      </div>
    </footer>
  </li>
</template>

<script>
import UIUploader from "../uploaders/UIUploader";
import UIMultiSelect from "../selects/UIMultiSelect";
import UIInputItems from "../inputs/UIInputItems";
import { minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  name: "CreateProductCard",
  components: {
    UIUploader,
    UIMultiSelect,
    UIInputItems
  },
  setup() {
    return { v$: useVuelidate() }
  },
  props: {
    addons: {
      type: Object,
      default: () => {}
    }
  },
  validations() {
    return {
      form: {
        name: {
          required,
          minLength: minLength(5)
        },
        categories: { required },
        types: { required },
        sizes: { required },
        img: { required },
        price: { required }
      }
    }
  },
  data() {
    return {
      form: {
        categories: [],
        types: [],
        sizes: [],
        price: 0,
        name: '',
        img: null
      }
    }
  },
  mounted() {
    if (this.defaultEdit) {
      this.status = 'EDIT'
    }
  },
  computed: {
    pizzaSizes() {
      return this.product.sizes
    },
    btnText() {
      return this.img ? 'Обновите фото' : 'Добавьте фото'
    }
  },
  methods: {
    saveChanges() {
      this.v$.$touch()
      if (this.v$.$invalid) return

      this.$emit('update', this.form)
    },
    convertToOptions(items) {
      return items.map(item => item.id)
    }
  }
}
</script>
