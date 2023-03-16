<template>
  <div
    class="sort-select"
    :class="{ '--st-open': isListOpen }"
    v-click-outside="hideList"
  >
    <div @click="toggleStateList" class="sort-select__elem">
      <div class="sort-select__icon">
        <svg viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"
          />
        </svg>
      </div>
      <div class="sort-select__label">Сортировка по:</div>
      <div class="sort-select__title">{{ valueElem.title }}</div>
    </div>
    <ul class="sort-select__list">
      <li
        v-for="opt of optionsList"
        :key="opt.value"
        @click="$emit('input', opt.value)"
        class="sort-select__option"
      >
        {{ opt.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { directive } from "v-click-outside";

export default {
  name: "UIFilterSelect",
  directives: {
    clickOutside: directive,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    toggleStateList() {
      this.isListOpen = !this.isListOpen;
    },
    hideList() {
      this.isListOpen = false;
    },
  },
  data() {
    return {
      isListOpen: false,
    };
  },
  computed: {
    valueElem() {
      return this.options.find((opt) => opt.value === this.value);
    },
    optionsList() {
      return this.options.filter((opt) => opt.value !== this.value);
    },
  },
};
</script>
