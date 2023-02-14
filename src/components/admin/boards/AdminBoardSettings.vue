<template>
  <div class="admin-all-settings">
    <ul class="admin-all-settings__grid">
      <AdminBlockBase title="Размеры">
        <ul class="admin-settings-options">
          <li class="admin-settings-row"
              v-for="(item, index) in form.sizes"
              :key="index"
          >
            <main class="admin-settings-row__main">
              <div class="admin-settings-row__input">
                <input type="number"
                       v-model="item.value"
                       class="admin-product-card-input --th-small"
                       :class="{'--th-error': v$.form.size?.$each.$response.$errors[index].value.length > 0}"
                >
              </div>
              <div class="admin-settings-row__label">см.</div>
            </main>
            <aside class="admin-settings-row__aside">
              <div class="admin-settings-row__out">{{ item.value }} см</div>
            </aside>
          </li>
        </ul>
      </AdminBlockBase>

      <AdminBlockBase title="Тип края">
        <ul class="admin-settings-options">
          <li class="admin-settings-row --th-types"
              v-for="(input, index) in form.types"
              :key="index"
          >
            <main class="admin-settings-row__main">
              <div class="admin-settings-row__input">
                <input type="text"
                       v-model="input.value"
                       class="admin-product-card-input --th-small"
                       :class="{'--th-error': v$.form.types?.$each.$response.$errors[index].value.length > 0}"
                >
              </div>
            </main>
          </li>
        </ul>
      </AdminBlockBase>

      <AdminBlockBase
          @click="addNewCategory"
          :button="{title: 'Добавить'}"
          theme="th-categories"
          title="Категории"
      >
        <ul class="admin-settings-options">
          <li class="admin-settings-row --th-types"
              v-for="(input, index) in form.categories"
              :key="index"
          >
            <main class="admin-settings-row__main">
              <div class="admin-settings-row__input">
                <input type="text"
                       v-model="input.value"
                       class="admin-product-card-input --th-small"
                       :class="{'--th-error': v$.form.categories?.$each.$response.$errors[index].value.length > 0}"
                >
              </div>
            </main>
          </li>
        </ul>
      </AdminBlockBase>
    </ul>
    <footer class="admin-all-settings__footer">
      <ul class="admin-all-settings__actions">
        <li class="admin-all-settings__action">
          <UIButton @click="save" :styles="['sz-base', 'th-orange']">Сохранить</UIButton>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, minLength, minValue } from "@vuelidate/validators";
import AdminBlockBase from "../blocks/AdminBlockBase";
import UIButton from "../../ui/buttons/UIButton";

const validateUnique = (param) => {
  return helpers.withParams({ value: param }, () => {
        const set = new Set(Object.values(param))
        return set.size === Object.keys(param).length
      }
  )
}

export default {
  name: "AdminBoardSettings",
  components: {
    AdminBlockBase,
    UIButton
  },
  props: {
    addons: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    addNewCategory() {
      this.form.categories.push({ value: 'Категория' })
    },
    save() {
      this.$store.dispatch('UPDATE_ADDONS', this.form)
    },
  },
  computed: {
    convertSizes() {
      const newArray = [...this.addons.sizes]
      for (let i = 0; i < 3; i++) {
        if (!newArray[i]) newArray[i] = {value: i + 1}
      }
      return newArray
    },
    convertTypes() {
      const newArray = [...this.addons.types]
      for (let i = 0; i < 2; i++) {
        if (!newArray[i]) newArray[i] = {value: `Тип: ${i + 1}`}
      }
      return newArray
    }
  },
  mounted() {
    this.form.sizes = [...this.convertSizes]
    this.form.types = [...this.convertTypes]
    this.form.categories = this.addons.categories
  },
  data() {
    return {
      form: {
        sizes: [],
        categories: [],
        types: [],
      },
    }
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      form: {
        sizes: {
          $each: helpers.forEach({
            value: {
              minValue: helpers.withMessage('Размер меньше 2 см.', minValue(0)),
              sameAs: helpers.withMessage('Размеры совпадают', validateUnique(this.form.sizes)),
            }
          })
        },
        types: {
          $each: helpers.forEach({
            value: {
              minValue: helpers.withMessage('Не меньше 2 символов', minLength(2)),
              maxValue: helpers.withMessage('Не больше 15 символов', maxLength(15)),
              sameAs: helpers.withMessage('Типы совпадают', validateUnique(this.form.types)),
            }
          })
        },
        categories: {
          $each: helpers.forEach({
            value: {
              minLength: helpers.withMessage('Не меньше 2 символов', minLength(2)),
              maxLength: helpers.withMessage('Не больше 10 символов', maxLength(10)),
              sameAs: helpers.withMessage('Значения совпадают', validateUnique(this.form.categories))
            }
          })
        }
      },
    }
  },
}
</script>
