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
    :class="!highlightedCocktail ? 'app--modal-open' : ''"
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
  @apply h-screen flex flex-col overflow-hidden text-slate-800;
}

.app__view-wrapper {
  @apply flex flex-col sm:flex-row h-full min-h-0 items-stretch;
}
  
@media print {
  .app--modal-open {
    @apply overflow-visible h-full;
  }
}
</style>