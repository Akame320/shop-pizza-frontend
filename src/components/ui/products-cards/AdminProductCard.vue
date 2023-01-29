<template>
  <li class="admin-product-card">
    <!-- BUTTONS -->
    <div class="admin-product-card__action-top">
      <button @click="startEdit" v-if="status !== 'EDIT'" class="admin-product-card__btn-top">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="64px" height="64px" viewBox="0 0 64 64">
          <g id="circle_copy_3_1_">
            <path d="M33.25,23.728l6.792,4.031l1.989-3.706l-6.789-4.033L33.25,23.728z M30.892,28.118l-1.96,3.493
					c0,0-1.324,2.36-1.96,3.493c-0.636,1.133-0.851,2.849-0.817,3.402l-0.675,4.818c0.031,0.504,0.306,0.957,0.729,1.209
					s0.943,0.27,1.383,0.045l3.718-3.01c0.485-0.246,1.822-1.311,2.452-2.433c0.629-1.122,0.979-1.745,0.979-1.745l0.489-0.873
					l2.451-4.367l1.43-2.664l-6.791-4.031L30.892,28.118z M32,0C14.327,0,0,14.327,0,32s14.327,32,32,32s32-14.327,32-32
					S49.673,0,32,0z M43.729,25.062l-6.801,12.465L36.439,38.4l-0.98,1.746c-0.318,0.567-0.68,1.34-1.326,1.668l-7.307,4.975
					c-0.262,0.134-0.543,0.191-0.826,0.197V47c-1.576,0-1.988-2-1.988-2l0.527-8.885c-0.046-0.741,0.416-1.451,0.735-2.021
					l0.979-1.745l7.291-13.339c0.541-0.965,1.739-1.295,2.677-0.738l6.791,4.033C43.949,22.863,44.271,24.097,43.729,25.062z"/>
          </g>
        </svg>
      </button>

      <button @click="saveChanges" v-else class="admin-product-card__btn-top">
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
        <img class="admin-product-card__img" :class="{'--th-edit': isStateEdit}" :src="img"/>
        <div v-if="isStateEdit" class="admin-product-card__uploader">
          <UIUploader :styles="['not-dragged']" v-model="v$.form.img.$model"/>
        </div>
      </div>
      <div class="admin-product-card__title-wrapper">
        <div v-if="!isStateEdit" class="admin-product-card-title">{{ product.name }}</div>
        <div v-else class="admin-product-card__title-input">
          <input type="text" v-model="v$.form.name.$model" class="admin-product-card-input">
        </div>
      </div>
    </header>

    <!-- SETTINGS -->
    <main class="product-card__main">
      <UIInputItems class="product-card__row-type" :value="v$.form.doughs.$model"
                    @input="(newVal) => v$.form.doughs.$model = newVal" :options="allDough"/>
      <UIInputItems class="product-card__row-size" :value="v$.form.sizes.$model"
                    @input="(newVal) => v$.form.sizes.$model = newVal" :options="allSizes"/>
      <div class="product-card__row-categories">
        <UIMultiSelect placeholder="Выберите категории" :options="allCategories" v-model="v$.form.categories.$model"/>
      </div>
    </main>

    <!-- PRICE -->
    <footer class="admin-product-card__footer">
      <div v-if="!isStateEdit" class="admin-product-card__price"><span
          class="admin-product-card-title">от {{ product.price }} ₽</span>
      </div>
      <div v-else class="admin-product-card__price">
        <span class="admin-product-card-title">от</span>
        <span class="admin-product-card__price-input">
           <input type="number" :value="v$.form.price.$model" @input="(newVal) => v$.form.price.$model = newVal"
                  class="admin-product-card-input">
        </span>
        <span class="admin-product-card-title">₽</span>
      </div>
    </footer>
  </li>
</template>

<script>
import UIUploader from "../uploaders/UIUploader";
import UIMultiSelect from "../selects/UIMultiSelect";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import UIInputItems from "../inputs/UIInputItems";

export default {
  name: "AdminProductCard",
  setup() {
    return { v$: useVuelidate() }
  },
  components: {
    UIUploader,
    UIMultiSelect,
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
    allCategories: {
      type: Array,
      default: () => []
    },
  },
  validations() {
    return {
      form: {
        name: {
          required, minLength: minLength(5)
        },
        categories: {
          required
        },
        doughs: {
          required
        },
        sizes: {
          required
        },
        img: {
          required
        },
        price: {
          required
        }
      }
    }
  },
  data() {
    return {
      status: 'PENDING',
      form: {
        categories: [],
        doughs: [],
        sizes: [],
        price: '',
        name: '',
        img: ''
      }
    }
  },
  computed: {
    img() {
      return 'http://localhost:5000/' + this.product.img
    },
    pizzaSizes() {
      return this.product.sizes
    },
    isStateEdit() {
      return this.status === 'EDIT'
    },
  },
  methods: {
    startEdit() {
      this.status = 'EDIT'
      this.v$.form.categories.$model = [...this.allCategories]
      this.v$.form.doughs.$model = [...this.allDough]
      this.v$.form.sizes.$model = [...this.allSizes]
      this.v$.form.price.$model = this.product.price
      this.v$.form.name.$model = this.product.name
    },
    saveChanges() {
      this.status = 'PENDING'
    }
  }
}
</script>
