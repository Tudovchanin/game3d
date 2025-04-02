<script setup lang='ts'>
import MainLayout from '@/layouts/MainLayout.vue';

</script>

<template>
  <MainLayout>
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </MainLayout>
</template>

<style lang="scss">

.v-enter-active,
.v-leave-active {
  transition: opacity  .5s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>