<template>
  <LayoutUser>
    <header class="layout-user-header">
      <h2 class="layout-user-header__title">Администратор</h2>
    </header>
    <main class="layout-user-main">
      <UIInputText
        placeholder="Введите email"
        name="email"
        :styles="['sz-base', 'th-gold']"
        :error="v$.form.email.$errors[0]?.$message"
        v-model="v$.form.email.$model"
      />
      <UIInputText
        placeholder="Введите пароль"
        name="password"
        type="password"
        :styles="['sz-base', 'th-gold']"
        :error="v$.form.password.$errors[0]?.$message"
        v-model="v$.form.password.$model"
      />
      <UIInputText
        placeholder="Подтвердите пароль"
        name="confirmPassword"
        type="password"
        :styles="['sz-base', 'th-gold']"
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
import {
  email,
  helpers,
  minLength,
  required,
  sameAs,
} from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { roles } from '../../const/user'

export default {
  name: 'AdminRegistration',
  components: {
    LayoutUser,
    UIInputText,
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
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      form: {
        email: {
          required: helpers.withMessage('Обязательное поле', required),
          email: helpers.withMessage('Введите валидную почту', email),
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
  methods: {
    async submit() {
      const email = this.form.email
      const password = this.form.password
      const role = roles.ADMIN

      await this.$store
        .dispatch('REGISTRATION', { email, password, role })
        .then(() => {
          this.$router.push('/admin/products')
        })
    },
  },
}
</script>
