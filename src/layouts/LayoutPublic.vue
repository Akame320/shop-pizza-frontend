<template>
  <div class="page-wrapper">
    <div class="page-form">
      <div class="products-page">
        <header
          class="products-page__header"
          :class="{ 'st-fixed': headerFixed }"
        >
          <main class="products-page__logo">
            <LogoDark />
          </main>
          <aside class="products-page__aside">
            <!-- Basket -->
            <template v-if="hasBasket">
              <button @click="basketHandler" class="basket">
                <div class="basket__left">
                  <span class="basket__sum"> {{ basketSum }} ₽ </span>
                </div>
                <div class="basket__right">
                  <span class="basket__icon">
                    <UIIcon name="basket" />
                  </span>
                  <span class="basket__count">{{ basketCount }}</span>
                </div>
              </button>
            </template>

            <!-- Login, Registration -->
            <template v-if="hasActions">
              <button @click="pushLogin" class="button-main --th-outline-grey">
                Войти
              </button>
              <button @click="pushRegistration" class="button-main">
                Регистрация
              </button>
            </template>

            <!-- Profile -->
            <template v-else>
              <div class="products-page__profile">
                <UIProfile />
              </div>
            </template>
          </aside>
        </header>
        <main class="products-page__main">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ROUTES from "../router/const";
import LogoDark from "../components/ui/logos/LogoDark";
import UIProfile from "@/components/ui/profile/UIProfile";
import UIIcon from "@/components/ui/icons/UIIcon";

const HEADER_FIXED = 200;

export default {
  name: "LayoutPublic",
  components: {
    LogoDark,
    UIProfile,
    UIIcon,
  },
  created() {
    window.addEventListener("scroll", () => {
      this.headerFixed = window.scrollY > HEADER_FIXED;
    });
  },
  destroyed() {
    window.removeEventListener("scroll");
  },
  methods: {
    basketHandler() {
      this.$router.push(ROUTES.PUBLIC.BASKET.path);
    },
    logout() {
      this.$store.dispatch("LOGOUT");
      this.$router.push(ROUTES.AUTH.LOGIN.path);
    },
    pushAdminPanel() {
      this.$router.push(ROUTES.ADMIN.PRODUCTS.path);
    },
    pushRegistration() {
      this.$router.push(ROUTES.AUTH.REGISTRATION.path);
    },
    pushLogin() {
      this.$router.push(ROUTES.AUTH.LOGIN.path);
    },
  },
  props: {
    hasBasket: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      headerFixed: false,
    };
  },
  computed: {
    ...mapGetters(["HAS_AUTH", "IS_ADMIN", "BASKET_SUM", "BASKET_COUNT"]),
    basketSum() {
      return this.BASKET_SUM;
    },
    basketCount() {
      return this.BASKET_COUNT;
    },
    hasActions() {
      return !this.HAS_AUTH;
    },
  },
};
</script>
