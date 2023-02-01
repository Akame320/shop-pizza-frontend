<template>
  <ul class="product-card-settings">
    <li class="product-card-settings__item"
        v-for="option of options"
        :key="option.value"
        :class="{
          '--th-selected': isSelectedItem(option.value),
          '--st-clicked': clickable
        }"
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
      type: [Array, Number, String],
      default: () => [],
    },
    clickable: {
      type: Boolean,
      default: true,
    },
    isMulti: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    isSelectedItem(value) {
      if (!this.isMulti) {
        return this.value === value
      }
      return this.value.find(val => val === value)
    },
    toggleOption(value) {
      if (!this.clickable) return

      if (!this.isMulti) {
        return this.$emit('input', value)
      }

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
