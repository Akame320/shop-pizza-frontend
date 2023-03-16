<template>
  <li class="admin-product-card" :class="{ '--th-edit': isStateEdit }">
    <!-- Placeholder Card -->
    <MainProductCard
      v-if="!isStateEdit"
      :is-admin="true"
      :product="product"
      :addons="addons"
    />

    <!-- BUTTONS -->
    <div class="admin-product-card-actions">
      <template v-if="!isStateEdit">
        <button @click="changeStateEdit" class="admin-product-card__btn-top">
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
        </button>

        <button @click="deleteProduct" class="admin-product-card__btn-top">
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M256 506C394.071 506 506 394.071 506 256C506 117.929 394.071 6 256 6C117.929 6 6 117.929 6 256C6 394.071 117.929 506 256 506Z"
              fill="red"
            />
            <path
              d="M378.7 134.3H298.1V120C298.1 112.3 291.8 106 284.1 106H228C220.3 106 214 112.3 214 120V134.2H133.4C129.5 134.2 126.3 137.4 126.3 141.3C126.3 145.2 129.5 148.4 133.4 148.4H146.5L155.4 380.7C155.9 394.9 167.5 406.1 181.7 406.1H330.4C344.6 406.1 356.2 395 356.7 380.7L365.6 148.4H378.7C382.6 148.4 385.8 145.2 385.8 141.3C385.8 137.4 382.6 134.3 378.7 134.3ZM228 120.1H284V134.2H228V120.1ZM342.6 380.1C342.3 386.7 337 391.9 330.4 391.9H181.6C175 391.9 169.6 386.7 169.4 380.1L160.5 148.4H351.5L342.6 380.1Z"
              fill="white"
            />
            <path
              d="M205.999 205.5H205.899C201.999 205.6 198.899 208.8 198.999 212.7L201.199 327.9C201.299 331.8 204.399 334.8 208.299 334.8H208.399C212.299 334.7 215.399 331.5 215.299 327.6L212.999 212.4C212.899 208.5 209.799 205.5 205.999 205.5Z"
              fill="white"
            />
            <path
              d="M255.999 205.5C252.099 205.5 248.899 208.7 248.899 212.6V327.8C248.899 331.7 252.099 334.9 255.999 334.9C259.899 334.9 263.099 331.7 263.099 327.8V212.5C263.099 208.6 259.899 205.5 255.999 205.5Z"
              fill="white"
            />
            <path
              d="M303.7 334.8H303.8C307.6 334.8 310.8 331.7 310.9 327.9L313.1 212.7C313.2 208.8 310.1 205.6 306.2 205.5C302.3 205.4 299.1 208.5 299 212.4L296.8 327.6C296.7 331.5 299.8 334.7 303.7 334.8Z"
              fill="white"
            />
          </svg>
        </button>
      </template>

      <template v-else>
        <button @click="closeEdit" class="admin-product-card__btn-top">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="red"
              d="M50,11A39,39,0,1,0,89,50,39.05,39.05,0,0,0,50,11ZM61.12,56.88a3,3,0,0,1,0,4.24,3,3,0,0,1-4.24,0L50,54.24l-6.88,6.88a3,3,0,0,1-4.24,0,3,3,0,0,1,0-4.24L45.76,50l-6.88-6.88a3,3,0,0,1,4.24-4.24L50,45.76l6.88-6.88a3,3,0,0,1,4.24,4.24L54.24,50Z"
            />
          </svg>
        </button>
      </template>
    </div>

    <ProductCardEditBoards
      v-if="isStateEdit"
      :addons="addons"
      save-btn-text="ОБНОВИТЬ"
      :product="productFormat"
      @save="updateHandler"
    />
  </li>
</template>

<script>
import MainProductCard from "./MainProductCard";
import ProductCardEditBoards from "./ProductCardEditBoards";
import { convertAddonToForm } from "./utilites";

export default {
  name: "AdminProductCard",
  components: {
    MainProductCard,
    ProductCardEditBoards,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    addons: {
      type: Object,
      default: () => {},
    },
    isEditChange: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isStateEdit: false,
    };
  },
  computed: {
    productFormat() {
      const newForm = { ...this.product };
      newForm.sizes = convertAddonToForm(this.addons.sizes, this.product.sizes);
      newForm.types = convertAddonToForm(this.addons.types, this.product.types);

      return newForm;
    },
  },
  methods: {
    changeStateEdit() {
      if (this.isEditChange) {
        this.isStateEdit = true;
        this.$emit("editStart");
      }
    },
    updateHandler(product) {
      this.$emit("update", product);
    },
    deleteProduct() {
      this.$emit("delete", this.product.id);
    },
    closeEdit() {
      this.isStateEdit = false;
    },
  },
};
</script>
