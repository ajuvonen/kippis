<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useI18n} from 'vue-i18n';
import type {SearchResultDrink} from '@/utils/types';
import {useCocktailStore} from '@/stores/cocktail';
import IconComponent from '@/components/IconComponent.vue';

defineProps<{
  item: SearchResultDrink;
}>();

const {t} = useI18n();

const cocktailStore = useCocktailStore();
const {addToSelection, removeFromSelection} = cocktailStore;
const {selection} = storeToRefs(cocktailStore);
</script>
<template>
  <div class="search-result__wrapper">
    <div class="search-result__image-wrapper" role="button" tabindex="0">
      <div
        :style="{background: `url(${item.thumb})`, backgroundSize: 'cover'}"
        class="search-result__image"
        role="presentation"
      ></div>
      <div class="search-result__shadow">
        {{ item.name }}
      </div>
    </div>
    <button
      v-if="!selection.has(item.id)"
      :aria-label="t('searchResults.addDrink', [item.name])"
      class="search-result__action-button"
      @click="addToSelection(item.id)"
    >
      <IconComponent icon="plus" />
    </button>
    <button
      v-else
      :aria-label="t('searchResults.removeDrink', [item.name])"
      class="search-result__action-button bg-red-300 border-slate-800"
      @click="removeFromSelection(item.id)"
    >
      <IconComponent icon="trashCan" />
    </button>
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

.search-result__action-button {
  @apply absolute -bottom-4 right-2 p-0 rounded-full w-10 text-lg;
}
</style>
