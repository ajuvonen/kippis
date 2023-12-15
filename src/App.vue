<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {RouterView} from 'vue-router';
import NavigationMenu from '@/components/NavigationMenu.vue';
import CocktailModal from '@/components/CocktailModal.vue';
import {useCocktailStore} from '@/stores/cocktail';

const cocktailStore = useCocktailStore();
const {highlightedCocktail} = storeToRefs(cocktailStore);
</script>

<template>
  <div
    :class="highlightedCocktail ? 'app--modal-open' : ''"
    class="app"
  >
    <NavigationMenu />
    <div class="app__view-wrapper">
      <RouterView />
    </div>
  </div>
  <CocktailModal />
</template>
<style lang="scss" scoped>
.app {
  @apply grid h-screen text-slate-800;
  grid-template-rows: auto 1fr;
}

.app__view-wrapper {
  @apply relative flex flex-col sm:flex-row min-h-0;
}
  
@media print {
  .app:not(.app--modal-open) {
    @apply h-full;
  }

  .app__view-wrapper {
    @apply min-h-screen;
  }
}
</style>