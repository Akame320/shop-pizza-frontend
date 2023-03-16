<template>
  <div class="layout-profile">
    <div class="layout-profile__logo">
      <LogoDark sub-title="Vue pizza :)" />
    </div>
    <div class="layout-profile__inner">
      <aside class="layout-profile__aside">
        <slot name="aside" />
      </aside>
      <main class="layout-profile__content">
        <div class="layout-profile__top">
          <div class="layout-profile__title-wrapper">
            <h1 class="layout-profile__title">Добрый день Антон!</h1>
          </div>
          <div class="layout-profile__avatar-wrapper">
            <UIProfile />
          </div>
        </div>
        <slot name="board" />
      </main>
    </div>
  </div>
</template>

<script>
import LogoDark from '../components/ui/logos/LogoDark'
import UIProfile from '../components/ui/profile/UIProfile'

export default {
  name: 'LayoutAdmin',
  components: {
    LogoDark,
    UIProfile,
  },
}
</script>
