<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {RouterLink} from 'vue-router';
import {useCocktailStore} from '@/stores/cocktail';
import LocaleChanger from '@/components/LocaleChanger.vue';

const {selection} = storeToRefs(useCocktailStore());
</script>
<template>
  <nav class="navigation-menu">
    <ul class="navigation-menu__link-container">
      <li>
        <RouterLink class="navigation-menu__link" to="/">{{ $t('menu.home') }}</RouterLink>
      </li>
      <li>
        <RouterLink class="navigation-menu__link" to="/search">{{ $t('menu.search') }}</RouterLink>
      </li>
      <li>
        <RouterLink class="navigation-menu__link relative" to="/instructions">
          {{ $t('menu.instructions') }}
          <div v-if="selection.length" class="navigation-menu__selection-size">
            {{ selection.length }}
          </div>
        </RouterLink>
      </li>
      <li>
        <LocaleChanger />
      </li>
    </ul>
  </nav>
</template>
<style lang="scss" scoped>
.navigation-menu {
  @apply h-14 bg-white shadow-sm;
}

.navigation-menu__link-container {
  @apply h-full flex justify-center;

  > li {
    @apply flex w-1/3 sm:w-auto;
  }
}

.navigation-menu__link {
  @apply w-full sm:w-32 flex items-center justify-center m-1 rounded-md uppercase text-sm tracking-wide transition-colors ease-in-out;

  &:hover {
    @apply bg-slate-800 text-white;
    :deep(svg path) {
      @apply fill-white;
    }
  }
}

.router-link-exact-active:not(:hover) {
  @apply bg-slate-100;
}

.navigation-menu__selection-size {
  @apply absolute top-0 right-0 w-5 h-5 pt-[0.1rem] text-slate-800 font-bold text-center bg-rose-400 text-xs rounded-full;
}

@media print {
  .navigation-menu {
    @apply hidden;
  }
}
</style>
