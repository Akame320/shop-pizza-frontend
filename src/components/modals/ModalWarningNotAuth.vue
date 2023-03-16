<template>
  <vue-final-modal
    classes="app-modal"
    overlay-class="app-modal-overflow"
    content-class="app-modal-content"
    name="no-auth"
    v-model="showModal"
  >
    <div class="md-ash-auth">
      <div class="md-ash-auth__title-wrapper">
        <h1 class="md-ash-auth__title">Пожалуйста авторизуйтесь</h1>
      </div>
      <ul class="md-ash-auth__buttons-list">
        <li class="md-ash-auth__button">
          <button
            @click="$router.push('/auth/login')"
            class="button-main --th-outline-grey"
          >
            Войти
          </button>
        </li>
        <li class="md-ash-auth__button">
          <button
            @click="$router.push('/auth/registration')"
            class="button-main"
          >
            Регистрация
          </button>
        </li>
      </ul>
    </div>
  </vue-final-modal>
</template>

<script>
export default {
  name: "ModalWarningNotAuth",
  data: () => ({
    showModal: false,
  }),
};
</script>
