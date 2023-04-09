<template>
  <div class="layout-user">
    <div class="layout-user__container">
      <div class="layout-user__header">
        <div class="layout-user__logo">
          <LogoDark :styles="['th-yellow']"  />
        </div>
        <div class="layout-user__aside">
          <UIButton :styles="['th-gold']">Пиццы</UIButton>
          <UIButton :styles="['th-outline-grey']">Авторизоваться</UIButton>
        </div>
      </div>
    </div>
    <div class="layout-user-form">
      <slot />
    </div>
  </div>
</template>

<script>
import LogoDark from "../components/ui/logos/LogoDark.vue";
import UIButton from "../components/ui/buttons/UIButton.vue";

export default {
  name: 'LayoutUser',
  components: {
    LogoDark,
    UIButton
  }
}
</script>
