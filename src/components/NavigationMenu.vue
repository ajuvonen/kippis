<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useI18n} from 'vue-i18n';
import {RouterLink} from 'vue-router';
import {useCocktailStore} from '@/stores/cocktail';

const {t} = useI18n();
const {selection} = storeToRefs(useCocktailStore());
</script>
<template>
  <nav class="navigation-menu">
    <ul class="navigation-menu__link-container">
      <li>
        <RouterLink class="navigation-menu__link" to="/">{{ t('menu.home') }}</RouterLink>
      </li>
      <li>
        <RouterLink class="navigation-menu__link" to="/search">{{ t('menu.search') }}</RouterLink>
      </li>
      <li>
        <RouterLink class="navigation-menu__link relative" to="/instructions">
          {{ t('menu.instructions') }}
          <div v-if="selection.length" class="navigation-menu__selection-size">
            {{ selection.length }}
          </div>
        </RouterLink>
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
  @apply w-full sm:w-32 flex flex-col justify-center text-center m-1 rounded-md uppercase text-sm tracking-wide transition-colors ease-in-out;

  &:hover {
    @apply bg-slate-800 text-white;
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
