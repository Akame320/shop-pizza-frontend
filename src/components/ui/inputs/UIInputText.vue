<template>
  <div class="main-input">
    <input :name="name" type="text" :value="value" @input="onInput" class="main-input__elem" :placeholder="placeholder">
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
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
  },
  methods: {
    onInput(event) {
      let { value } = event.target
      this.$emit('input', value)
    },
  }
}
</script>
