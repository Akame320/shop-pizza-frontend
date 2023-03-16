<template>
  <LayoutUser>
    <header class="layout-user-header">
      <h2 class="layout-user-header__title">Регистрация</h2>
    </header>
    <main class="layout-user-main">
      <UIInputText
        placeholder="Введите email"
        name="email"
        :error="v$.form.email.$errors[0]?.$message"
        v-model="v$.form.email.$model"
      />
      <UIInputText
        placeholder="Введите пароль"
        name="password"
        :error="v$.form.password.$errors[0]?.$message"
        v-model="v$.form.password.$model"
      />
      <UIInputText
        placeholder="Подтвердите пароль"
        name="confirmPassword"
        :error="v$.form.confirmPassword.$errors[0]?.$message"
        v-model="v$.form.confirmPassword.$model"
      />
    </main>
    <footer class="layout-user-footer">
      <ul class="layout-user-footer__list">
        <li class="layout-user-footer__item">
          <button
            @click="$router.push('/')"
            class="button-main --th-outline-grey"
          >
            Назад
          </button>
        </li>
        <li class="layout-user-footer__item">
          <button @click="submit" class="button-main">Отправить</button>
        </li>
      </ul>
    </footer>
  </LayoutUser>
</template>

<script>
import LayoutUser from '../../layouts/LayoutUser'
import UIInputText from '../../components/ui/inputs/UIInputText'
import useVuelidate from '@vuelidate/core'
import {
  email,
  helpers,
  minLength,
  required,
  sameAs,
} from '@vuelidate/validators'

export default {
  name: 'registration',
  components: {
    LayoutUser,
    UIInputText,
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  computed: {},
  methods: {
    async submit() {
      const email = this.form.email
      const password = this.form.password
      await this.$store
        .dispatch('REGISTRATION', { email, password })
        .then(() => {
          this.$router.push('/')
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
          minLength: helpers.withMessage(
            'Минимальная длина 6 символов',
            minLength(6)
          ),
        },
        confirmPassword: {
          password: helpers.withMessage(
            'Пароли не совпадают',
            sameAs(this.form.password)
          ),
        },
      },
    }
  },
}
</script>
