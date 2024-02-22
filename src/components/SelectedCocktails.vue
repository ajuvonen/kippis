<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useCocktailStore} from '@/stores/cocktail';
import SelectedCocktailsContent from '@/components/SelectedCocktailsContent.vue';

const cocktailStore = useCocktailStore();
const {selection} = storeToRefs(cocktailStore);
</script>
<template>
  <Transition
    enter-from-class="ml-[-400px]"
    enter-to-class="ml-0"
    leave-from-class="ml-0"
    leave-to-class="ml-[-400px]"
    enter-active-class="transition-all"
    leave-active-class="transition-all">
    <aside v-if="selection.length" class="selected-cocktails">
      <SelectedCocktailsContent v-if="selection.length" />
    </aside>
  </Transition>
</template>
<style lang="scss" scoped>
.selected-cocktails {
  @apply z-10 h-full w-[400px] flex flex-col bg-slate-800;
}
</style>
