<template>
  <div class="uploader-block" :class="classes">
    <input ref="input" type="file" class="uploader-block__input" />
    <div class="uploader-block__action">
      <UIButton @click="addFile">Добавьте фото</UIButton>
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
  data() {
    return {
      img: null
    }
  },
  methods: {
    addFile() {
      this.$refs.input.click()
    }
  }
}
</script>
