<template>
  <div
    class="admin-product-card-price__row"
    :class="{ '--th-disabled': !value.isActive }"
  >
    <div class="admin-product-card-price__left">
      <div class="admin-product-card-price__state">
        <UICheckbox
          :value="value.isActive"
          @input="(val) => update('isActive', val)"
        />
      </div>
      <div class="admin-product-card-price__input">
        <UIInputText
          :disabled="!value.isActive"
          type="text"
          :value="v$.value.price.$model"
          @input="(val) => update('price', val)"
        />
      </div>
    </div>
    <div class="admin-product-card-price__out">См: {{ value.price }}</div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { requiredIf } from "@vuelidate/validators";
import UIInputText from "./inputs/UIInputText";
import UICheckbox from "./checkbox/UICheckbox";
import { helpers } from "@vuelidate/validators/dist/raw.esm";

export default {
  name: "CustomComponent",
  components: {
    UIInputText,
    UICheckbox,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      value: {
        price: {
          minLength: helpers.withMessage(
            "Поле цены не должно быть пустым",
            requiredIf(this.value.isActive)
          ),
        },
      },
    };
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    update(key, value) {
      const newValue = { ...this.value };
      newValue[key] = value;
      this.$emit("input", newValue);
    },
  },
};
</script>
