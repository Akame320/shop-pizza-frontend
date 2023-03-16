<template>
  <div class="admin-products-skeleton">
    <div class="card-admin-banner">
      <Skeleton width="100%" height="21.5rem" />
    </div>
    <ul class="admin-actions-skeleton">
      <li class="admin-actions-skeleton__item">
        <Skeleton width="15rem" height="4rem" />
      </li>
      <li class="admin-actions-skeleton__item">
        <Skeleton width="15rem" height="4rem" />
      </li>
    </ul>
    <div class="admin-products__products-list">
      <div
        class="card-admin-skeleton"
        v-for="item in skeletonCards"
        :key="item"
      >
        <div class="card-admin-skeleton__btn">
          <Skeleton width="4rem" height="4rem" :circle="true" />
        </div>
        <div class="card-admin-skeleton__img">
          <Skeleton width="14vw" height="14vw" :circle="true" />
        </div>
        <div class="card-admin-skeleton__title">
          <Skeleton width="24rem" height="2.4rem" />
        </div>
        <div class="card-admin-skeleton__settings">
          <Skeleton width="28.5rem" height="13.4rem" />
        </div>
        <div class="card-admin-skeleton__price">
          <Skeleton width="9rem" height="2.6rem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Skeleton } from 'vue-loading-skeleton'

export default {
  name: 'AdminBoardProductsSkeleton',
  components: {
    Skeleton,
  },
  data() {
    return {
      skeletonCards: 10,
    }
  },
}
</script>
