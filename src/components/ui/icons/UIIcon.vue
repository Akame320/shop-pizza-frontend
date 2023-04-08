<template>
  <div v-if="circle.length > 0" class="nc-icon-circle" :class="circle">
    <component class="nc-icon" :class="styles" :is="isIcon" />
  </div>

  <component v-else class="nc-icon" :class="styles" :is="isIcon" />
</template>

<script>
import mixinStyle from '@/mixins/UIComponent'
import BasketSVG from './components/BasketSVG'
import UserSVG from './components/UserSVG'
import MenuSVG from './components/MenuSVG'
import BasketFillSVG from './components/BasketFillSVG'
import LogoutSVG from './components/LogoutSVG'

const icons = [
  {
    name: 'basket',
    elem: BasketSVG,
  },
  {
    name: 'user',
    elem: UserSVG,
  },
  {
    name: 'menu',
    elem: MenuSVG,
  },
  {
    name: 'basket-fill',
    elem: BasketFillSVG,
  },
  {
    name: 'logout',
    elem: LogoutSVG,
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
    circle: {
      type: Array,
      default: () => [],
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
