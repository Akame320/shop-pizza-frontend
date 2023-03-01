<template>
  <div class="uploader-block" :class="classes">
    <input ref="input" type="file" @input="inputHandler" class="uploader-block__input"/>
    <img class="uploader-block__img" :class="{'th-gray': !localImg}" :src="imgPreview"/>
    <div class="uploader-block__action">
      <UIButton :styles="btnStyles" @click="addFile">
        <slot/>
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
    },
    imgSrc: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localImg: null
    }
  },
  computed: {
    imgPreview() {
      return this.localImg ? this.localImg : this.imgSrc ? 'http://localhost:5000/' + this.imgSrc : '/static/img/product-mocks/pizza.jpg'
    },
  },
  methods: {
    addFile() {
      this.$refs.input.click()
    },
    inputHandler(event) {
      const file = event.target.files[0]
      this.$emit('input', file)
      this.updatePhoto(file)
    },
    updatePhoto(file) {
      let reader = new FileReader();
      reader.onload = (event) => {
        this.localImg = event.target.result
      }
      reader.readAsDataURL(file);
    }
  }
}
</script>
