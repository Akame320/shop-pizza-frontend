<template>
  <div class="admin-all-settings">
    <ul class="admin-all-settings__grid">
      <AdminSizesBlock
          v-model="v$.form.sizes.$model"
          :errors="v$.form.sizes.$silentErrors[0]?.$message"/>

      <AdminBlockBase title="Типы">
        <ul class="admin-settings-block__options">
          <li class="admin-settings-block__row">
            <main class="admin-settings-block__row-main">
              <div class="admin-settings-block__input">
                <input type="number"
                       class="admin-product-card-input --th-small">
              </div>
              <div class="admin-settings-block__label">см.</div>
            </main>
            <aside class="admin-settings-block__row-aside">
              <div class="admin-settings-block__out">30 см</div>
            </aside>
          </li>
        </ul>
      </AdminBlockBase>

      <AdminBlockBase :button="{title: 'Добавить'}" theme="th-categories" title="Категории">
        <ul class="admin-settings-block__options">
          <li class="admin-settings-block__row">
            <main class="admin-settings-block__row-main">
              <div class="admin-settings-block__input">
                <input type="text"
                       class="admin-product-card-input --th-small">
              </div>
            </main>
          </li>
        </ul>
      </AdminBlockBase>
    </ul>
  </div>
</template>

<script>
import AdminBlockBase from "../blocks/AdminBlockBase";
import useVuelidate from "@vuelidate/core";
import { helpers, minValue, not, sameAs } from "@vuelidate/validators";
import AdminSizesBlock from "../blocks/AdminSizesBlock";

export default {
  name: "AdminBoardSettings",
  components: {
    AdminBlockBase,
    AdminSizesBlock
  },
  props: {
    sizes: {
      type: Array,
      default: () => []
    },
    categories: {
      type: Array,
      default: () => []
    },
    doughs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        sizes: {
          small: this.sizes[0] || 0,
          medium: this.sizes[1] || 0,
          big: this.sizes[2] || 0,
        },
        categories: this.sizes,
        doughs: this.sizes,
      }
    }
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      form: {
        sizes: {
          small: {
            minValue: helpers.withMessage('Размер меньше 2 см.', minValue(2)),
            sameAs: helpers.withMessage('Размеры совпадают', not(sameAs('big'))),
          },
          medium: {
            minValue: helpers.withMessage('Размер меньше 2 см.', minValue(2)),
            sameAs: helpers.withMessage('Размеры совпадают', not(sameAs(this.form.sizes.big))),
          },
          big: {
            minValue: helpers.withMessage('Размер меньше 2 см.', minValue(2)),
            sameAs: helpers.withMessage('Размеры совпадают', not(sameAs(this.form.sizes.small))),
          },
        },
      }
    }
  },
}
</script>
