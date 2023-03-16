<template>
  <LayoutPublic :has-basket="false">
    <div class="page-basket">
      <div class="page-basket__inner">
        <template v-if="hasBasketNotNull">
          <header class="page-basket__header">
            <div class="page-basket-header">
              <main class="page-basket-header__main">
                <div class="page-basket-header__icon">
                  <svg
                    viewBox="0 0 31 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.6667 28.7917C12.0014 28.7917 13.0833 27.7097 13.0833 26.375C13.0833 25.0403 12.0014 23.9583 10.6667 23.9583C9.33198 23.9583 8.25 25.0403 8.25 26.375C8.25 27.7097 9.33198 28.7917 10.6667 28.7917Z"
                      stroke="#3F3F3F"
                      stroke-width="2.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M25.1667 28.7917C26.5014 28.7917 27.5833 27.7097 27.5833 26.375C27.5833 25.0403 26.5014 23.9583 25.1667 23.9583C23.832 23.9583 22.75 25.0403 22.75 26.375C22.75 27.7097 23.832 28.7917 25.1667 28.7917Z"
                      stroke="#3F3F3F"
                      stroke-width="2.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.85117 8.24999H28.7916L26.7616 18.3879C26.6511 18.9442 26.3484 19.4439 25.9066 19.7996C25.4648 20.1553 24.912 20.3442 24.3449 20.3333H11.5728C10.9828 20.3383 10.4113 20.1273 9.96612 19.74C9.52095 19.3527 9.23286 18.8159 9.15617 18.2308L7.3195 4.31083C7.24334 3.72991 6.95872 3.19643 6.51862 2.80968C6.07852 2.42292 5.5129 2.20922 4.927 2.20833H2.20825"
                      stroke="#3F3F3F"
                      stroke-width="2.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <h1 class="page-basket-header__title">Корзина</h1>
              </main>
              <aside class="page-basket-header__aside">
                <button @click="clearAllProducts" class="basket-clear-btn">
                  <span class="basket-clear-btn__icon">
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 5H4.16667H17.5"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.33337 9.16667V14.1667"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.6666 9.16667V14.1667"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span class="basket-clear-btn__text">Очистить корзину</span>
                </button>
              </aside>
            </div>
          </header>
          <main class="page-basket__main">
            <ul class="basket-main">
              <ProductRow
                v-for="product of productsInBasket"
                :key="product.id"
                :product="product"
                @increment="increment"
                @decrement="decrement"
                @remove="remove"
              />
            </ul>
          </main>
          <footer class="page-basket__footer">
            <div class="page-basket-footer">
              <div class="page-basket-footer__col">
                <div class="page-basket-footer__top">
                  <h3 class="page-basket-footer__title">
                    Всего пицц:
                    <strong>{{ BASKET_COUNT }} шт.</strong>
                  </h3>
                </div>
                <button
                  @click="$router.push('/')"
                  class="button-main --th-outline-grey --sz-big basket-big-btn"
                >
                  Вернуться
                  <span class="u-mobile-hidden"> назад </span>
                </button>
              </div>
              <div class="page-basket-footer__col">
                <div class="page-basket-footer__top">
                  <h3 class="page-basket-footer__title">
                    Сумма заказа:
                    <strong class="u-color-accept"> {{ BASKET_SUM }} ₽</strong>
                  </h3>
                </div>
                <button class="button-main --sz-big basket-big-btn">
                  Оплатить
                  <span class="u-mobile-hidden"> сейчас</span>
                </button>
              </div>
            </div>
          </footer>
        </template>
        <template v-else>
          <div class="basket-null">
            <div class="basket-null__inner">
              <div class="basket-null__title-wrapper">
                <h1 class="basket-null__title">Корзина пустая</h1>
              </div>
              <div class="basket-null__subtitle-wrapper">
                <div class="basket-null__subtitle">
                  Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы
                  заказать пиццу, перейди на главную страницу.
                </div>
              </div>
              <div class="basket-null__img-wrapper">
                <img
                  class="basket-null__img"
                  src="/static/img/basket/basket.svg"
                  alt=""
                />
              </div>
              <div class="basket-null__action-wrapper">
                <button
                  @click="$router.push('/')"
                  class="button-main basket-null-action"
                >
                  Вернуться назад
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <ModalWarningNotAuth />
  </LayoutPublic>
</template>

<script>
import LayoutPublic from '../layouts/LayoutPublic'
import { mapGetters } from 'vuex'
import ProductRow from '../components/basket/ProductRow'
import ModalWarningNotAuth from '../components/modals/ModalWarningNotAuth'

export default {
  name: 'Basket',
  components: {
    LayoutPublic,
    ProductRow,
    ModalWarningNotAuth,
  },
  computed: {
    ...mapGetters(['GET_BASKET', 'BASKET_COUNT', 'BASKET_SUM', 'HAS_AUTH']),
    productsInBasket() {
      return this.GET_BASKET
    },
    hasBasketNotNull() {
      return this.BASKET_COUNT > 0
    },
  },
  methods: {
    increment(id) {
      this.$store.commit('BASK_PRODUCT_INCREMENT', { id })
    },
    decrement(id) {
      this.$store.commit('BASK_PRODUCT_DECREMENT', { id })
    },
    remove(id) {
      this.$store.commit('BASKET_PRODUCT_CLEAR', { id })
    },
    clearAllProducts() {
      this.$store.commit('BASKET_CLEAR')
    },
  },
}
</script>
