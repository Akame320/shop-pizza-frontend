<template>
  <div class="layout-profile">
    <div class="layout-profile__logo">
      <LogoDark />
    </div>
    <div class="layout-profile__inner">
      <main class="layout-profile__content"><slot name="board"/></main>
      <aside class="layout-profile__aside"><slot name="aside"/></aside>
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
