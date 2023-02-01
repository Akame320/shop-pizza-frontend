<template>
  <LayoutAdmin>
    <template #board>
      <AdminBoardProducts :products="PRODUCTS" :sizes="SIZES" :categories="CATEGORIES" :doughs="DOUGHS" />
    </template>
    <template #aside>
      <nav class="layout-profile-nav">
        <ul class="layout-profile-nav__list">
          <li v-for="link of navigation" :key="link.link" class="layout-profile-nav__item">
            <router-link class="layout-profile-nav__link" active-class="--st-active" :to="link.link">{{ link.title }}</router-link>
          </li>
        </ul>
      </nav>
    </template>
  </LayoutAdmin>
</template>

<script>
import LayoutAdmin from "../../layouts/LayoutAdmin";
import AdminBoardProducts from "../../components/admin/boards/AdminBoardProducts";
import { mapGetters } from "vuex";

export default {
  name: "Products",
  components: {
    LayoutAdmin,
    AdminBoardProducts
  },
  data() {
    return {
      products: [],
      navigation: [
        {
          title: 'Товары',
          link: 'products'
        },
        {
          title: 'Настройки',
          link: 'settings'
        },
      ]
    }
  },
  computed: {
    ...mapGetters(['PRODUCTS', 'SIZES', 'CATEGORIES', 'DOUGHS']),
  },
  created() {
    this.$store.dispatch('GET_PRODUCTS').then(({ data }) => {
      this.products = [...data]
    })
    this.$store.dispatch('GET_SIZES')
    this.$store.dispatch('GET_CATEGORIES')
    this.$store.dispatch('GET_DOUGHS')
  }
}
</script>
