<template>
  <div class="checkbox">
    <input
        class="checkbox__input"
        type="checkbox"
        :checked="value"
        @change="$emit('input', $event.target.checked)"
    >
    <div class="checkbox__elem"/>
  </div>
</template>

<script>
export default {
  name: "UICheckbox",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
}
</script>
