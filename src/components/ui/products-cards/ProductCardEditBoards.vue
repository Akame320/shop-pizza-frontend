<template>
  <div>
    <!-- Errors -->
    <div class="admin-pizza-card-error" :class="{'--st-error': showErrors}">
      <ul class="create-pizza-card__errors-list">
        <li class="create-pizza-card__errors-item" :key="error.$uid" v-for="error of v$.$errors">
          {{ error.$message }}
        </li>
      </ul>
    </div>


    <!-- Main Data -->
    <transition name="card-change-anim">
      <div v-if="isStepMain" class="create-pizza-card-step">
        <div class="create-pizza-card-top">
          <div class="create-pizza-card-top__img">
            <img :src="img"/>
            <div class="create-pizza-card-top__upload">
              <UIUploader :btn-styles="['sz-small']" id="uploader-img" @input="(file) => form.img = file"
                          :simple="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                        d="M7 9H5l3-3 3 3H9v5H7V9zm5-4c0-.44-.91-3-4.5-3C5.08 2 3 3.92 3 6 1.02 6 0 7.52 0 9c0 1.53 1 3 3 3h3v-1.3H3c-1.62 0-1.7-1.42-1.7-1.7 0-.17.05-1.7 1.7-1.7h1.3V6c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V12h2c2.08 0 4-1.16 4-3.5C16 6.06 14.08 5 12 5z"/>
                </svg>
              </UIUploader>
            </div>
          </div>
          <div class="create-pizza-card-top__title">
            <UIInputText placeholder="Название" v-model="form.name" :styles="['th-small']"/>
          </div>
          <div class="create-pizza-card-top__select">
            <UIMultiSelect placeholder="Категории" :options="addons.categories"
                           v-model="form.categories"/>
          </div>
        </div>
      </div>
    </transition>


    <!-- Prices -->
    <transition name="card-change-anim">
      <div v-if="isStepPrice" class="create-pizza-card-step">
        <div class="create-pizza-price">
          <h2 class="create-pizza-price__title">
            Размеры
          </h2>
          <div class="create-pizza-price__elem">
            <UIAdminCardPriceInput
                v-for="item of form.sizes"
                :key="item.id"
                :value="item"
                @input="(value) => updateItem(item, value)"
            />
          </div>
        </div>
        <div class="create-pizza-price">
          <h2 class="create-pizza-price__title">
            Типы
          </h2>
          <div class="create-pizza-price__elem">
            <UIAdminCardPriceInput
                v-for="item of form.types"
                :key="item.id"
                :value="item"
                @input="(value) => updateItem(item, value)"
            />
          </div>
        </div>
      </div>
    </transition>


    <!-- Actions -->
    <footer class="create-pizza-card-action">
      <UIButton :styles="['sz-small', 'th-outline-grey']" @click="toggleStep">{{ toggleBtnTitle }}</UIButton>
      <UIButton :styles="['sz-small']" @click="save">{{ saveBtnText }}</UIButton>
    </footer>
  </div>
</template>

<script>
import UIAdminCardPriceInput from "../UIAdminCardPriceInput";
import UIButton from "../buttons/UIButton";
import UIInputText from "../inputs/UIInputText";
import UIUploader from "../uploaders/UIUploader";
import UIMultiSelect from "../selects/UIMultiSelect";
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, required } from "@vuelidate/validators";

const STEPS = {
  main: 'MAIN',
  price: 'PRICE',
}

const ERRORS_VISIBLE_TIME = 3000

export default {
  name: "ProductCardEditBoards",
  components: {
    UIAdminCardPriceInput,
    UIButton,
    UIInputText,
    UIUploader,
    UIMultiSelect
  },
  setup() {
    return { v$: useVuelidate() }
  },
  props: {
    addons: {
      type: Object,
      default: () => {
      }
    },
    product: {
      type: Object,
      default: () => {
      }
    },
    saveBtnText: {
      type: String,
      default: ''
    }
  },
  created() {
    this.form = { ...this.product }
  },
  validations() {
    return {
      form: {
        name: {
          required: helpers.withMessage('Название обязательно', required),
          minLength: helpers.withMessage('Длина названия < 5', minLength(5))
        },
        categories: { required: helpers.withMessage('Категории не выбраны', required) },
        types: { required: helpers.withMessage('Типы пиццы не выбраны', required) },
        sizes: { required: helpers.withMessage('Размеры пиццы не выбраны', required) },
        img: { required: helpers.withMessage('Картинка обязательна', required) },
      }
    }
  },
  data() {
    return {
      showErrors: false,
      step: STEPS.main,
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
    isStepPrice() {
      return this.step === STEPS.price
    },
    isStepMain() {
      return this.step === STEPS.main
    },
    img() {
      return '/static/img/product-mocks/pizza.jpg'
    },
    toggleBtnTitle() {
      return this.isStepMain ? 'ЦЕНЫ' : 'НАЗАД'
    }
  },
  methods: {
    updateItem(item, newItem) {
      item.price = newItem.price
      item.isActive = newItem.isActive
    },
    toggleStep() {
      if (this.step === STEPS.main) {
        this.step = STEPS.price
      } else {
        this.step = STEPS.main
      }
    },
    save() {
      this.v$.$touch()
      if (this.v$.$invalid) {
        return this.openErrors()
      }

      this.$emit('save', this.form)
    },
    openErrors() {
      this.showErrors = true
      setTimeout(() => {
        this.errors = false
      }, ERRORS_VISIBLE_TIME)
    }
  }
}
</script>
