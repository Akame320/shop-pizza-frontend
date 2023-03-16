<template>
  <component :class="styles" :is="isIcon" />
</template>

<script>
import mixinStyle from '@/mixins/UIComponent'
import BasketSVG from './components/BasketSVG'

const icons = [
  {
    name: 'basket',
    elem: BasketSVG,
  },
]

export default {
  name: 'UIIcon',
  mixins: [mixinStyle],
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    isIcon() {
      const searchIcon = icons.find((icon) => icon.name === this.name)
      return searchIcon.elem
    },
  },
}
</script>
