<template>
  <div class="admin-products">
    <!-- BANNER -->
    <div class="admin-products-banner">
      <div class="banner">
        <p class="banner__text">
          Привет! Первый раз тут ? Давай я проведу твоё обучение :)
        </p>
        <p class="banner__text">
          Нажимай на значок
          <span class="banner__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64px"
              height="64px"
              viewBox="0 0 64 64"
            >
              <g id="circle_copy_3_1_">
                <path
                  d="M33.25,23.728l6.792,4.031l1.989-3.706l-6.789-4.033L33.25,23.728z M30.892,28.118l-1.96,3.493
					c0,0-1.324,2.36-1.96,3.493c-0.636,1.133-0.851,2.849-0.817,3.402l-0.675,4.818c0.031,0.504,0.306,0.957,0.729,1.209
					s0.943,0.27,1.383,0.045l3.718-3.01c0.485-0.246,1.822-1.311,2.452-2.433c0.629-1.122,0.979-1.745,0.979-1.745l0.489-0.873
					l2.451-4.367l1.43-2.664l-6.791-4.031L30.892,28.118z M32,0C14.327,0,0,14.327,0,32s14.327,32,32,32s32-14.327,32-32
					S49.673,0,32,0z M43.729,25.062l-6.801,12.465L36.439,38.4l-0.98,1.746c-0.318,0.567-0.68,1.34-1.326,1.668l-7.307,4.975
					c-0.262,0.134-0.543,0.191-0.826,0.197V47c-1.576,0-1.988-2-1.988-2l0.527-8.885c-0.046-0.741,0.416-1.451,0.735-2.021
					l0.979-1.745l7.291-13.339c0.541-0.965,1.739-1.295,2.677-0.738l6.791,4.033C43.949,22.863,44.271,24.097,43.729,25.062z"
                />
              </g>
            </svg>
          </span>
          и у тебя откроется режим редактирования. Там ты можешь изменить
          название, картинку, категории, и цены.
        </p>
        <p class="banner__text --th-mt-20">
          Обрати внимание на цены. Они работают по следующей форме:
          <strong>Цена за размер</strong><span>&nbsp;+&nbsp;</span
          ><strong>Цена за тип края</strong>
        </p>
        <div class="banner__action">
          <UIButton :styles="['th-black', 'sz-small']">НЕ ПОКАЗЫВАТЬ</UIButton>
        </div>
      </div>
    </div>

    <!-- ACTIONS -->
    <div class="admin-products__settings">
      <ul class="admin-products-actions">
        <!-- Action -:- Import -->
        <li class="admin-products-actions__item">
          <UIButton @click="$emit('import-csv')" :styles="['th-orange']">
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

    <!-- CARDS -->
    <template>
      <transition name="top-change-anim">
        <ul class="admin-products__products-list">
          <CreateProductCard :addons="addons" @create="createPizza" />
          <AdminProductCard
            v-for="product of products"
            :key="product.title"
            :product="product"
            :addons="addons"
            :is-edit-change="hasCardEdit"
            @update="updatePizza"
            @delete="deleteProduct"
            @changeStateEdit="validateStateEdits"
          />
        </ul>
      </transition>
    </template>
  </div>
</template>

<script>
import UIButton from '../../ui/buttons/UIButton'
import AdminProductCard from '../../ui/products-cards/AdminProductCard'
import CreateProductCard from '../../ui/products-cards/CreateProductCard'

export default {
  name: 'AdminBoardProducts',
  components: {
    UIButton,
    AdminProductCard,
    CreateProductCard,
  },
  data() {
    return {
      hasCardEdit: true,
    }
  },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    addons: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    addNewPizza() {
      this.hasCreatedPizza = true
    },
    createPizza(product) {
      this.$emit('productCreate', product)
    },
    updatePizza(product) {
      this.$emit('productUpdate', product)
    },
    deleteProduct(id) {
      this.$emit('productDelete', id)
    },
    validateStateEdits() {
      this.hasCardEdit = false
    },
  },
}
</script>
