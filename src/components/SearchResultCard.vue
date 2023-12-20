<script setup lang="ts">
import type {SearchResultCocktail} from '@/utils/types';
import {useCocktailStore} from '@/stores/cocktail';
import ActionButtons from '@/components/ActionButtons.vue';
import LazyCocktailImage from '@/components/LazyCocktailImage.vue';

defineProps<{
  cocktail: SearchResultCocktail;
}>();

const cocktailStore = useCocktailStore();
const {openCocktailModal} = cocktailStore;
</script>
<template>
  <div class="search-result" ref="wrapper">
    <div
      :aria-label="$t('searchResultCard.open', [cocktail.name])"
      class="search-result__image-wrapper"
      role="button"
      tabindex="0"
      @click="openCocktailModal(cocktail.id)"
      @keypress.enter="openCocktailModal(cocktail.id)"
    >
      <LazyCocktailImage :src="`${cocktail.thumb}/preview`" class="search-result__image" />
      <div class="search-result__shadow">
        {{ cocktail.name }}
      </div>
    </div>
    <ActionButtons :cocktail="cocktail" />
  </div>
</template>
<style lang="scss" scoped>
.search-result {
  @apply relative shadow-md rounded-md hover:cursor-pointer hover:shadow-lg transition-shadow ease-in-out;
}

.search-result__image-wrapper {
  @apply relative overflow-hidden w-[200px] h-[200px] sm:w-40 sm:h-40 rounded-md;
  outline-offset: 0.2rem;
}

.search-result__image {
  filter: contrast(115%);
  transition: transform 0.5s ease-in-out;
  &:hover {
    transform: scale(1.1) rotate(-5deg);
  }
}

.search-result__shadow {
  @apply absolute w-full h-full top-0 pointer-events-none bg-gradient-to-b from-slate-800 to-transparent to-40% text-white uppercase text-sm sm:text-xs p-2;
}

@media print {
  .search-result {
    @apply w-fit;
  }

  .search-result__shadow {
    @apply bg-none;
  }
}
</style>
