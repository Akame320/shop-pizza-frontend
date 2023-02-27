<template>
  <div class="uploader-block" :class="classes">
    <input ref="input" type="file" @input="inputHandler" class="uploader-block__input" />
    <div class="uploader-block__action">
      <UIButton :styles="btnStyles" @click="addFile">
        <slot />
      </UIButton>
    </div>
  </div>
</template>

<script>
import UIButton from "../buttons/UIButton";
import mixinStyle from "../../../mixins/UIComponent";

export default {
  name: "UIUploader",
  mixins: [mixinStyle],
  components: {
    UIButton,
  },
  props: {
    btnText: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: ''
    },
    simple: {
      type: Boolean,
      default: false
    },
    btnStyles: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      img: null
    }
  },
  computed: {
    addingClass() {
      if (this.simple) {
        return ['--not-dragged', '--hidden']
      }

      return []
    }
  },
  methods: {
    addFile() {
      this.$refs.input.click()
    },
    inputHandler(event) {
      this.$emit('input', event.target.files[0])
    },

  }
}
</script>
