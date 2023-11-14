<script setup lang="ts">
import {storeToRefs} from 'pinia';
import type {SearchResultDrink} from '@/utils/types';
import {useCocktailStore} from '@/stores/cocktail';
import ActionButtons from './ActionButtons.vue';

defineProps<{
  item: SearchResultDrink;
}>();

const cocktailStore = useCocktailStore();
const {highlightedCocktail} = storeToRefs(cocktailStore);
</script>
<template>
  <div class="search-result__wrapper">
    <div class="search-result__image-wrapper" role="button" tabindex="0" @click="highlightedCocktail = item.id">
      <div
        :style="{background: `url(${item.thumb}/preview)`, backgroundSize: 'cover'}"
        class="search-result__image"
        role="presentation"
      ></div>
      <div class="search-result__shadow">
        {{ item.name }}
      </div>
    </div>
    <ActionButtons :cocktail="item" />
  </div>
</template>
<style lang="scss" scoped>
.search-result__wrapper {
  @apply relative shadow-md rounded-md hover:cursor-pointer hover:shadow-lg transition-shadow ease-in-out;
}

.search-result__image-wrapper {
  @apply relative overflow-hidden w-40 h-40 rounded-md;
  outline-offset: 0.2rem;
}

.search-result__image {
  @apply h-full;
  filter: contrast(115%);
  transition: transform 0.5s ease-in-out;
  &:hover {
    transform: scale(1.1) rotate(-5deg);
  }
}

.search-result__shadow {
  @apply absolute w-full h-full top-0 pointer-events-none bg-gradient-to-b from-slate-800 to-transparent to-40% text-white uppercase text-xs p-2;
}
</style>
