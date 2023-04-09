<template>
  <LayoutUser>
    <header class="layout-user-header">
      <h2 class="layout-user-header__title">Регистрация</h2>
    </header>
    <main class="layout-user-main">
      <UIInputText
          placeholder="Почта*"
          name="email"
          :styles="['sz-base', 'th-gold']"
          :error="v$.form.email.$errors[0]?.$message"
          v-model="v$.form.email.$model"
      />
      <UIInputText
          placeholder="Имя*"
          name="confirmPassword"
          :styles="['sz-base', 'th-gold']"
          :error="v$.form.name.$errors[0]?.$message"
          v-model="v$.form.name.$model"
      />
      <UIInputText
          placeholder="Пароль*"
          name="email"
          type="password"
          :styles="['sz-base', 'th-gold']"
          :error="v$.form.password.$errors[0]?.$message"
          v-model="v$.form.password.$model"
      />
      <UIInputText
          placeholder="Повторите пароль*"
          name="email"
          type="password"
          :styles="['sz-base', 'th-gold']"
          :error="v$.form.confirmPassword.$errors[0]?.$message"
          v-model="v$.form.confirmPassword.$model"
      />
      <div class="layout-user-main__checkbox">
        <div class="layout-user-checkbox" :class="{'--st-active': v$.form.police.$model}">
          <UICheckbox
              :styles="['sz-base', 'th-gold']"
              id="police"
              :error="v$.form.police.$errors[0]?.$message"
              v-model="v$.form.police.$model"
          />
          <label class="layout-user-checkbox__text" for="police">Я ознакомился и соглашаюсь с политикой
            <router-link class="base-link" to="/about">обработки данных</router-link>
          </label>
        </div>

      </div>
    </main>
    <footer class="layout-user-footer">
      <ul class="layout-user-footer__list">
        <li class="layout-user-footer__item">
          <UIButton @click="submit" :styles="['th-gold', 'sz-base']">Зарегистрироваться</UIButton>
        </li>
      </ul>
    </footer>
  </LayoutUser>
</template>

<script>
import LayoutUser from '../../layouts/LayoutUser'
import UIInputText from '../../components/ui/inputs/UIInputText'
import useVuelidate from '@vuelidate/core'
import UICheckbox from "../../components/ui/checkbox/UICheckbox.vue";

import {
  email,
  helpers,
  minLength,
  required,
  sameAs,
} from '@vuelidate/validators'
import UIButton from "../../components/ui/buttons/UIButton.vue";

export default {
  name: 'registration',
  components: {
    UIButton,
    UICheckbox,
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
        name: '',
        password: '',
        confirmPassword: '',
        police: false,
      },
    }
  },
  computed: {},
  methods: {
    async submit() {
      const email = this.form.email
      const password = this.form.password
      const name = this.form.password

      await this.v$.$validate()
      if (this.v$.$error) return

      await this.$store
          .dispatch('REGISTRATION', { email, password, other: { firstName: name } })
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
        name: {
          required: helpers.withMessage('Обязательное поле', required),
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
        police: {
          required: helpers.withMessage('Обязательное поле', sameAs(true)),
        },
      },
    }
  },
}
</script>
