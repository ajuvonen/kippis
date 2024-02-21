<script setup lang="ts">
import {ref, watch} from 'vue';
import {storeToRefs} from 'pinia';
import {useCocktailStore} from '@/stores/cocktail';
import IconComponent from '@/components/IconComponent.vue';
import SelectedCocktailsContent from '@/components/SelectedCocktailsContent.vue';

const cocktailStore = useCocktailStore();
const {selection} = storeToRefs(cocktailStore);

const selectedCocktailsOpen = ref(false);

watch(selection, () => {
  if (!selection.value.length) {
    selectedCocktailsOpen.value = false;
  }
});
</script>
<template>
  <Transition
    enter-from-class="ml-[-100%]"
    enter-to-class="ml-0"
    leave-from-class="ml-0"
    leave-to-class="ml-[-100%]"
    enter-active-class="transition-all"
    leave-active-class="transition-all"
  >
    <button
      v-if="selection.length"
      class="selected-cocktails__mobile-button"
      :class="
        selectedCocktailsOpen
          ? 'selected-cocktails__mobile-button--top'
          : 'selected-cocktails__mobile-button--bottom'
      "
      :aria-label="
        $t(
          selectedCocktailsOpen
            ? 'selectedCocktails.closeSelectedCocktails'
            : 'selectedCocktails.openSelectedCocktails',
        )
      "
      @click="selectedCocktailsOpen = !selectedCocktailsOpen"
    >
      <IconComponent :icon="selectedCocktailsOpen ? 'down' : 'cocktail'" />
    </button>
  </Transition>
  <Transition
    enter-from-class="top-[100%]"
    enter-to-class="top-0"
    leave-from-class="top-0"
    leave-to-class="top-[100%]"
    enter-active-class="transition-all"
    leave-active-class="transition-all"
  >
    <aside v-if="selectedCocktailsOpen && selection.length" class="selected-cocktails pt-10">
      <SelectedCocktailsContent />
    </aside>
  </Transition>
</template>
<style lang="scss" scoped>
.selected-cocktails__mobile-button {
  @apply absolute z-20 left-0 w-full mb-0 py-2 rounded-none border-l-0 border-r-0;
}

.selected-cocktails__mobile-button--top {
  @apply top-0 rounded-bl-md rounded-br-md border-t-0;
}

.selected-cocktails__mobile-button--bottom {
  @apply bottom-0 rounded-tl-md rounded-tr-md border-b-0;
}

.selected-cocktails {
  @apply absolute z-10 w-full h-full flex flex-col bg-slate-800;
}

@media print {
  .selected-cocktails {
    @apply hidden;
  }
}
</style>
