<template>
  <ul>
    <li v-for="option of options"
        :key="option.value"
        class="product-card__item --st-clicked"
        :class="{'--active': isSelectedItem(option.value)}"
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
  },
  methods: {
    isSelectedItem(value) {
      return this.value.find(val => val === value)
    },
    toggleOption(value) {
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
