<template>
  <ul class="product-card-settings">
    <li v-for="option of options"
        :key="option.value"
        class="product-card-settings__item"
        :class="{'--th-selected': isSelectedItem(option.value), '--st-clicked': clickable}"
        @click="toggleOption(option.value)"
    >
      {{ option.title }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "UIInputItems",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    isSelectedItem(value) {
      return this.value.find(val => val === value)
    },
    toggleOption(value) {
      if (!this.clickable) return

      const newValue = [...this.value]
      const index = this.value.findIndex(item => item === value)

      if (index !== -1) {
        newValue.splice(index, 1)
      } else {
        newValue.push(value)
      }

      this.$emit('input', newValue)
    }
  }
}
</script>
