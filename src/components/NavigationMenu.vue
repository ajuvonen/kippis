<script setup lang="ts">
import {useI18n} from 'vue-i18n';
import {RouterLink} from 'vue-router';

const {t} = useI18n();
</script>
<template>
  <ul
    class="fixed h-14 bottom-0 sm:top-0 w-full z-10 bg-white flex flex-nowrap justify-center items-stretch shadow-sm"
    role="navigation"
  >
    <RouterLink to="/">{{ t('menu.home') }}</RouterLink>
    <RouterLink to="/search">{{ t('menu.search') }}</RouterLink>
    <RouterLink to="/selection">{{ t('menu.selection') }}</RouterLink>
  </ul>
</template>
<style lang="scss" scoped>
a {
  @apply flex flex-col justify-center w-1/3 sm:w-28 text-center m-1 rounded-md uppercase text-sm tracking-wide transition-colors ease-in-out;

  &:hover {
    @apply bg-slate-800 text-white;
  }

  &.router-link-exact-active:not(:hover) {
    @apply bg-slate-100;
  }
}
</style>
