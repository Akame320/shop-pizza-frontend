<template>
  <div
    class="avatar-block"
    v-click-outside="hideList"
    :class="{ '--st-opened': opened }"
  >
    <main class="avatar-block__main">
      <h4 class="avatar-block__name">Anton Petrov</h4>
      <span class="avatar-block__role">Admin</span>
    </main>
    <aside class="avatar-block__aside">
      <div class="avatar-block__avatar"></div>
      <div class="avatar-block__initials">A.P.</div>

      <button @click="toggle" class="avatar-block__arrow">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 44 44"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          enable-background="new 0 0 44 44"
        >
          <path
            d="m22,0c-12.2,0-22,9.8-22,22s9.8,22 22,22 22-9.8 22-22-9.8-22-22-22zm12,31c0,0.6-0.4,1-1,1h-22c-0.6,0-1-0.4-1-1v-2c0-0.6 0.4-1 1-1h22c0.6,0 1,0.4 1,1v2zm0-8c0,0.6-0.4,1-1,1h-22c-0.6,0-1-0.4-1-1v-2c0-0.6 0.4-1 1-1h22c0.6,0 1,0.4 1,1v2zm0-8c0,0.6-0.4,1-1,1h-22c-0.6,0-1-0.4-1-1v-2c0-0.6 0.4-1 1-1h22c0.6,0 1,0.4 1,1v2z"
          />
        </svg>
      </button>
    </aside>

    <ul class="avatar-block__list">
      <li class="avatar-block__option">Админ панель</li>
      <li class="avatar-block__option">Корзина</li>
      <li class="avatar-block__option">Выйти</li>
    </ul>
  </div>
</template>

<script>
import { directive } from "v-click-outside";

export default {
  name: "UIProfile",
  directives: {
    clickOutside: directive,
  },
  props: {
    profile: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      opened: false,
    };
  },
  methods: {
    toggle() {
      this.opened = !this.opened;
    },
    hideList() {
      this.opened = false;
    },
  },
};
</script>
