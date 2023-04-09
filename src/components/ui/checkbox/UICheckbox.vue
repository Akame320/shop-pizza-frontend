<template>
  <div class="checkbox" :class="classes">
    <input
      class="checkbox__input"
      type="checkbox"
      :checked="value"
      :id="id"
      @change="$emit('input', $event.target.checked)"
    />
    <div class="checkbox__elem" />
  </div>
</template>

<script>
import mixinStyle from '@/mixins/UIComponent'
export default {
  name: 'UICheckbox',
  mixins: [mixinStyle],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: '',
    },
  },
  computed: {
    addingClass() {
      const list = []

      if (this.error) list.push('--st-error')

      return list
    },
  }
}
</script>
