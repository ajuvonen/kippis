<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useCocktailStore} from '@/stores/cocktail';
import SelectedCocktailsContent from '@/components/SelectedCocktailsContent.vue';

const cocktailStore = useCocktailStore();
const {selection} = storeToRefs(cocktailStore);
</script>
<template>
  <Transition>
    <aside v-if="selection.length" class="selected-cocktails">
      <SelectedCocktailsContent v-if="selection.length" />
    </aside>
  </Transition>
</template>
<style lang="scss" scoped>
.selected-cocktails {
  @apply absolute z-10 w-full h-full md:w-[400px] md:static flex flex-col bg-slate-800;
}

.v-enter-to,
.v-leave-from {
  @apply ml-0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s;
}

.v-enter-from,
.v-leave-to {
  @apply ml-[-400px];
}
</style>
