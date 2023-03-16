<template>
  <LayoutAdmin>
    <template #board>
      <transition name="top-change-anim">
        <AdminBoardProductsSkeleton v-if="loading" />
        <component
          v-if="!loading && !hiddenBoard"
          :is="currentBoard"
          :products="PRODUCTS"
          :addons="ADDONS"
          @productUpdate="updateProduct"
          @productCreate="createProduct"
          @productDelete="deleteProduct"
        />
      </transition>
    </template>
    <template #aside>
      <nav class="layout-profile-nav">
        <ul class="layout-profile-nav__list">
          <li
            class="layout-profile-nav__item"
            v-for="nav of navigation"
            :key="nav.title"
          >
            <span
              class="layout-profile-nav__link"
              :class="{ '--st-active': isLinkActive(nav.id) }"
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
import AdminBoardProductsSkeleton from "../../components/admin/skeleton/AdminBoardProductsSkeleton";
import { convertToFormData } from "../../utils/servers";

const START_APP_BOARD = 1;
const APP_BOARDS = {
  products: {
    title: "Товары",
    id: 1,
    elem: AdminBoardProducts,
  },
  settings: {
    title: "Настройки",
    id: 2,
    elem: AdminBoardSettings,
  },
};

export default {
  name: "Panel",
  components: {
    LayoutAdmin,
    AdminBoardProductsSkeleton,
  },
  async created() {
    this.$store.dispatch("GET_DATA").then(() => {
      this.loading = false;
    });
  },
  data() {
    return {
      activeBoardId: START_APP_BOARD,
      navigation: APP_BOARDS,
      loading: true,
      hiddenBoard: false,
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS", "ADDONS"]),
    currentBoard() {
      switch (this.activeBoardId) {
        case APP_BOARDS.products.id:
          return APP_BOARDS.products.elem;
        case APP_BOARDS.settings.id:
          return APP_BOARDS.settings.elem;
        default:
          return APP_BOARDS.products.elem;
      }
    },
  },
  methods: {
    changeBoard(newBoardId) {
      this.activeBoardId = newBoardId;
    },
    isLinkActive(boardId) {
      return boardId === this.activeBoardId;
    },
    async createProduct(product) {
      this.hiddenBoard = true;

      await this.$store
        .dispatch("CREATE_PIZZA", convertToFormData(product))
        .then(() => {
          this.updateBoard();
        })
        .catch(() => {
          this.$store.commit("SET_ERROR", { message: "Ошибка :(" });
        })
        .finally(() => {
          this.hiddenBoard = false;
        });
    },
    async updateProduct(product) {
      this.hiddenBoard = true;

      await this.$store
        .dispatch("UPDATE_PIZZA", convertToFormData(product))
        .then(() => {
          this.updateBoard();
        })
        .catch(() => {
          this.$store.commit("SET_ERROR", { message: "Ошибка :(" });
        })
        .finally(() => {
          this.hiddenBoard = false;
        });
    },
    async deleteProduct(id) {
      await this.$store.dispatch("DELETE_PRODUCT", id);
    },
    updateBoard() {
      setTimeout(() => {
        this.hiddenBoard = false;
      }, 150);
    },
  },
};
</script>
