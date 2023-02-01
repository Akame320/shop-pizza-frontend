<template>
  <div class="layout-profile">
    <div class="layout-profile__logo">
      <LogoDark sub-title="Vue pizza :)" />
    </div>
    <div class="layout-profile__inner">
      <aside class="layout-profile__aside"><slot name="aside"/></aside>
      <main class="layout-profile__content">
        <div class="layout-profile__top">
          <div class="layout-profile__title-wrapper">
            <h1 class="layout-profile__title">Добрый день Антон!</h1>
          </div>
          <div class="layout-profile__avatar-wrapper">
            <div class="avatar-block">
              <main class="avatar-block__main">
                <h4 class="avatar-block__name">Anton Petrov</h4>
                <span class="avatar-block__role">Admin</span>
              </main>
              <aside class="avatar-block__aside">
                <div class="avatar-block__avatar"></div>
                <div class="avatar-block__initials">A.P.</div>
              </aside>
            </div>
          </div>
        </div>
        <slot name="board"/></main>
    </div>
  </div>
</template>

<script>
import LogoDark from "../components/ui/logos/LogoDark";

export default {
  name: "LayoutAdmin",
  components: {
    LogoDark
  }
}
</script>
