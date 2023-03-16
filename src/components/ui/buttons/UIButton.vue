<template>
  <button @click="$emit('click')" class="button-main" :class="classes">
    <slot />
  </button>
</template>

<script>
import mixinStyle from '../../../mixins/UIComponent'
export default {
  name: 'UIButton',
  mixins: [mixinStyle],
}
</script>
