<script setup lang="ts">
import type {SearchResultDrink} from '@/utils/types';
import {useCocktailStore} from '@/stores/cocktail';

defineProps<{
  item: SearchResultDrink;
}>();

const {addToSelection} = useCocktailStore();
</script>
<template>
  <div class="search-result__wrapper">
    <div class="search-result__image-wrapper" role="button" tabindex="0">
      <div
        :style="{background: `url(${item.thumb})`, backgroundSize: 'cover'}"
        class="search-result__image"
      ></div>
      <div class="search-result__shadow">
        {{ item.name }}
      </div>
    </div>
    <button class="search-result__add-button" @click="addToSelection(item.id)">Add</button>
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

.search-result__add-button {
  @apply absolute -bottom-4 right-2;
}
</style>
