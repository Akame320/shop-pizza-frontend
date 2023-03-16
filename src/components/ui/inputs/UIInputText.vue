<template>
  <div class="main-input">
    <input
      :disabled="disabled"
      :type="type"
      :name="name"
      :value="value"
      @input="onInput"
      class="main-input__elem"
      :placeholder="placeholder"
    />
    <div v-if="error" class="main-input__error">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: "UIInputText",
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
  },
  methods: {
    onInput(event) {
      let { value } = event.target;
      this.$emit("input", value);
    },
  },
};
</script>
