<template>
  <ul class="categories-tabs">
    <li
      v-for="cat of categories"
      :key="cat.value"
      class="categories-tabs-item"
      :class="categoriesStyles(cat.value)"
      @click="toggleCategories(cat.value)"
    >
      {{ cat.title }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'UITabsButton',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    toggleCategories(catId) {
      const newVal = [...this.value]
      const hasSelectedIndex = newVal.indexOf(catId)
      const hasLastChild = newVal.length === 1
      const isAll = catId === 0
      const allSelected = newVal.indexOf(0)

      if (isAll && allSelected === -1) {
        newVal.splice(0, newVal.length)
        newVal.push(catId)
        return this.$emit('input', newVal)
      }

      if (hasSelectedIndex >= 0 && hasLastChild) {
        newVal.splice(hasSelectedIndex, 1)
        newVal.push(0)
        return this.$emit('input', newVal)
      }

      if (hasSelectedIndex >= 0 && !hasLastChild) {
        newVal.splice(hasSelectedIndex, 1)
        return this.$emit('input', newVal)
      }

      if (hasSelectedIndex === -1) {
        if (allSelected >= 0) {
          newVal.splice(allSelected, 1)
        }
        newVal.push(catId)
        return this.$emit('input', newVal)
      }
    },
    categoriesStyles(catId) {
      return { '--st-selected': this.value.includes(catId) }
    },
  },
}

/**
 * Клик по категории
 * Выбранная -
 *  - Последняя ? Удали и добавь All
 *  - Не последняя ? Удали
 *
 * Не выбранная -
 *  - All есть ? Удали All и добавь категорию
 *  - All нет ? Добавь категорию
 *
 * Клик по All +
 * Убирает все остальные +
 * Повторный клик не возможен +
 */
</script>
