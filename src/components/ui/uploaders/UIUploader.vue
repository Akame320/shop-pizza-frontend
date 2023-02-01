<template>
  <div class="uploader-block" :class="classes">
    <input ref="input" type="file" @input="inputHandler" class="uploader-block__input" />
    <div class="uploader-block__action">
      <UIButton @click="addFile">{{ btnText }}</UIButton>
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
    }
  },
  data() {
    return {
      img: null
    }
  },
  methods: {
    addFile() {
      this.$refs.input.click()
    },
    inputHandler(event) {
      this.$emit('input', event.target.files[0])
    }
  }
}
</script>
