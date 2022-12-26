<template>
  <LayoutUser>
    <header class="layout-user-header">
      <h2 class="layout-user-header__title">Авторизация</h2>
    </header>
    <main class="layout-user-main">
      <UIInputText
          v-model="v$.form.email.$model"
          :error="v$.form.email.$errors[0]?.$message || error"
          name="email"
      />
      <UIInputText
          v-model="v$.form.password.$model"
          :error="v$.form.password.$errors[0]?.$message"
          name="password"
      />
    </main>
    <footer class="layout-user-footer">
      <ul class="layout-user-footer__list">
        <li class="layout-user-footer__item">
          <button @click="$router.push('/')" class="button-main --th-outline-grey">Назад</button>
        </li>
        <li class="layout-user-footer__item">
          <button @click="submit" class="button-main">Отправить</button>
        </li>
      </ul>
    </footer>
  </LayoutUser>
</template>

<script>
import LayoutUser from "../../layouts/LayoutUser";
import { email, helpers, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import UIInputText from "../../components/ui/inputs/UIInputText";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  components: {
    LayoutUser,
    UIInputText
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  computed: {
    ...mapGetters(['IS_ADMIN'])
  },
  methods: {
    async submit() {
      const email = this.form.email
      const password = this.form.password

      this.$store.dispatch('LOGIN', { email, password }).then(() => {
        if (this.IS_ADMIN) this.$router.push('/admin/panel')
        else this.$router.push('/')
      }).catch(e => {
        this.error = e.response.data.message
      })
    },
  },
  validations() {
    return {
      form: {
        email: {
          required: helpers.withMessage('Обязательное поле', required),
          email: helpers.withMessage('Введите email', email),
        },
        password: {
          required: helpers.withMessage('Обязательное поле', required),
          minLength: helpers.withMessage('Минимальная длина 6 символов ', minLength(6)),
        }
      }
    }
  },
  watch: {
    'form.email'() {
      this.error = ''
    }
  }
}
</script>
