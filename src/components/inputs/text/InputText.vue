<template>
  <div class="input-text-primary">
    <div class="input-text-primary__inner">
      <div class="input-text-primary__elem-wrapper">
        <input :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)" type="text" class="input-text-primary__elem" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputText",
  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
}
</script>
