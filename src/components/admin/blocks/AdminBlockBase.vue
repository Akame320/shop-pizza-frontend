<template>
  <li class="admin-settings-block" :class="`--${theme}`">
    <header class="admin-settings-block__header">
      <h2 class="admin-settings-block__title">
        <span>{{ title }} </span>
      </h2>
      <span v-if="error" class="admin-settings-block__error">{{ error }}</span>
    </header>
    <main class="admin-settings-block__main">
      <slot/>
    </main>
    <footer v-if="button" class="admin-settings-block__footer">
      <UIButton @click="$emit('click')" :styles="['th-orange', 'sz-small']">
        <span class="u-text-uppercase">{{ button.title }}</span>
      </UIButton>
    </footer>
  </li>
</template>

<script>
import UIButton from "../../ui/buttons/UIButton";

export default {
  name: "AdminBlockBase",
  components: {
    UIButton
  },
  props: {
    theme: {
      type: String,
      default: ''
    },
    button: {
      type: Object,
      default: () => {
      }
    },
    title: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  }
}
</script>
