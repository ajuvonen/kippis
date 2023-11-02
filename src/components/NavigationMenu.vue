<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useI18n} from 'vue-i18n';
import {RouterLink} from 'vue-router';
import {useCocktailStore} from '@/stores/cocktail';

const {t} = useI18n();
const {selection} = storeToRefs(useCocktailStore());
</script>
<template>
  <nav class="h-14 z-50 bg-white shadow-sm flex-shrink-0">
    <ul class="h-full flex flex-nowrap justify-center items-stretch">
      <RouterLink to="/">{{ t('menu.home') }}</RouterLink>
      <RouterLink to="/search">{{ t('menu.search') }}</RouterLink>
      <RouterLink class="relative" to="/ingredients">
        {{ t('menu.ingredients') }}
        <div
          v-if="selection.size"
          class="absolute flex justify-center align-center pb-[0.15rem] top-0 right-0 w-4 h-4 text-white text-center bg-rose-500 text-xs rounded-full"
        >
          {{ selection.size }}
        </div>
      </RouterLink>
    </ul>
  </nav>
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
