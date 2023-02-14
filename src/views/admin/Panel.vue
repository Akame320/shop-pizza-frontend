<template>
  <LayoutAdmin>
    <template #board>
      <component
          :is="currentBoard"
          :products="PRODUCTS"
          :addons="ADDONS"
      />
    </template>
    <template #aside>
      <nav class="layout-profile-nav">
        <ul class="layout-profile-nav__list">
          <li class="layout-profile-nav__item"
              v-for="nav of navigation"
              :key="nav.title"
          >
            <span class="layout-profile-nav__link"
                  :class="{'--st-active': isLinkActive(nav.id)}"
                  @click="changeBoard(nav.id)"
            >
              {{ nav.title }}
            </span>
          </li>
        </ul>
      </nav>
    </template>
  </LayoutAdmin>
</template>

<script>
import LayoutAdmin from "../../layouts/LayoutAdmin";
import { mapGetters } from "vuex";
import AdminBoardProducts from "../../components/admin/boards/AdminBoardProducts";
import AdminBoardSettings from "../../components/admin/boards/AdminBoardSettings";

const START_APP_BOARD = 1
const APP_BOARDS = {
  products: {
    title: "Товары",
    id: 1,
    elem: AdminBoardProducts
  },
  settings: {
    title: "Настройки",
    id: 2,
    elem: AdminBoardSettings
  }
}

export default {
  name: "Panel",
  components: {
    LayoutAdmin,
  },
  data() {
    return {
      activeBoardId: START_APP_BOARD,
      navigation: APP_BOARDS
    }
  },
  computed: {
    ...mapGetters(['PRODUCTS', 'ADDONS']),
    currentBoard() {
      switch (this.activeBoardId) {
        case APP_BOARDS.products.id:
          return APP_BOARDS.products.elem
        case APP_BOARDS.settings.id:
          return APP_BOARDS.settings.elem
        default:
          return APP_BOARDS.products.elem
      }
    }
  },
  methods: {
    changeBoard(newBoardId) {
      this.activeBoardId = newBoardId
    },
    isLinkActive(boardId) {
      return boardId === this.activeBoardId
    }
  },
  created() {
    this.$store.dispatch('GET_DATA')
  }
}
</script>
