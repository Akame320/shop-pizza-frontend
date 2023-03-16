export default {
  name: 'UIComponent',
  props: {
    styles: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    classes() {
      const list = []
      this.styles.forEach((style) => {
        list.push(`--${style}`)
      })
      return list.concat(...this.addingClass)
    },
    addingClass() {
      return []
    },
  },
}
