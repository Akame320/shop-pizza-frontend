<template>
  <div class="main-input" :class="classes">
    <div class="main-input__label">
      {{ placeholder }}

      <span v-if="error" class="main-input__error">
        {{ error }}
      </span>
    </div>
    <input
        :disabled="disabled"
        :type="type"
        :name="name"
        :value="value"
        @input="onInput"
        class="main-input__elem"
    />

  </div>
</template>

<script>
import UIComponent from "../../../mixins/UIComponent";

export default {
  name: 'UIInputText',
  mixins: [UIComponent],
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  methods: {
    onInput(event) {
      let { value } = event.target
      this.$emit('input', value)
    },
  },
}
</script>
