<template>
  <AdminBlockBase :error="errors" title="Размеры">
    <ul class="admin-settings-options">
      <!-- One -->
      <li class="admin-settings-row">
        <main class="admin-settings-row__main">
          <div class="admin-settings-row__input">
            <input class="admin-product-card-input --th-small"
                   type="number"
                   :value="value.small"
                   @input="(event) => update(event.target.value, 'small')"
            >
          </div>
          <div class="admin-settings-row__label">см.</div>
        </main>
        <aside class="admin-settings-row__aside">
          <div class="admin-settings-row__out">{{ value.small }} см</div>
        </aside>
      </li>

      <!-- Two -->
      <li class="admin-settings-row">
        <main class="admin-settings-row__main">
          <div class="admin-settings-row__input">
            <input class="admin-product-card-input --th-small"
                   type="number"
                   :value="value.medium"
                   @input="(event) => update(event.target.value, 'medium')"
            >
          </div>
          <div class="admin-settings-row__label">см.</div>
        </main>
        <aside class="admin-settings-row__aside">
          <div class="admin-settings-row__out">{{ value.medium }} см</div>
        </aside>
      </li>

      <!-- Three -->
      <li class="admin-settings-row">
        <main class="admin-settings-row__main">
          <div class="admin-settings-row__input">
            <input class="admin-product-card-input --th-small"
                   type="number"
                   :value="value.big"
                   @input="(event) => update(event.target.value, 'big')"
            >
          </div>
          <div class="admin-settings-row__label">см.</div>
        </main>
        <aside class="admin-settings-row__aside">
          <div class="admin-settings-row__out">{{ value.big }} см</div>
        </aside>
      </li>
    </ul>
  </AdminBlockBase>
</template>

<script>
import AdminBlockBase from "./AdminBlockBase";

export default {
  name: "AdminSizesBlock",
  components: {
    AdminBlockBase,
  },
  props: {
    value: {
      type: Object,
      default: () => {
      }
    },
    errors: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        small: this.value.small,
        medium: this.value.medium,
        big: this.value.big,
      }
    }
  },
  methods: {
    update(value, key) {
      this.form[key] = +value
      this.$emit('input', this.form)
    }
  }

}
</script>
