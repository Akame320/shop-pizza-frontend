<template>
  <div class="multi-select" v-click-outside="hide" :class="classes">
    <div class="multi-select__value" @click="opened = !opened">
      <!-- Text -->
      <div v-if="isShowPlaceholder" class="multi-select__title">
        {{ placeholder }}
      </div>
      <div v-else class="multi-select__title">
        Категории: <strong>{{ countValues }}</strong>
      </div>

      <!-- Arow -->
      <div class="multi-select__arrow">
        <svg viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"
          />
        </svg>
      </div>
    </div>
    <ul class="multi-select__list">
      <li
        v-for="option of options"
        :key="option.value"
        @click="changeOption(option.value)"
        class="multi-select__option"
        :class="{ '--st-active': hasOptionSelected(option.value) }"
      >
        <div class="multi-select__title">{{ option.title }}</div>
        <template v-if="hasOptionSelected(option.value)">
          <div class="multi-select__status">
            <svg fill="none" viewBox="0 0 26 26">
              <path
                d="M8.5 14L11.1 16.6"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="2"
              />
              <path
                d="M18.2 10L11.6 16.6"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="2"
              />
              <path
                d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="2"
              />
            </svg>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { directive } from "v-click-outside";
import mixinStyle from "../../../mixins/UIComponent";

export default {
  name: "UIMultiSelect",
  directives: {
    clickOutside: directive,
  },
  mixins: [mixinStyle],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "",
    },
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      opened: false,
    };
  },
  computed: {
    countValues() {
      return this.value.length;
    },
    isShowPlaceholder() {
      return this.value.length === 0;
    },
    addingClass() {
      const list = [];

      if (!this.clickable) list.push("--st-disabled");
      if (this.opened) list.push("--st-opened");

      return list;
    },
  },
  methods: {
    changeOption(value) {
      if (!this.clickable) return;

      const array = [...this.value];
      const elemIndex = array.findIndex((option) => option === value);
      if (elemIndex !== -1) {
        array.splice(elemIndex, 1);
      } else {
        array.push(value);
      }

      this.$emit("input", array);
    },
    hasOptionSelected(value) {
      return this.value.find((val) => val === value);
    },
    hide() {
      this.opened = false;
    },
  },
};
</script>
