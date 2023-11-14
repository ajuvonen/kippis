<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type {SearchResultCocktail} from '@/utils/types';
import {useCocktailStore} from '@/stores/cocktail';
import ActionButtons from '@/components/ActionButtons.vue';

defineProps<{
  cocktail: SearchResultCocktail;
}>();

const {t} = useI18n();

const cocktailStore = useCocktailStore();
const {openCocktailModal} = cocktailStore;
</script>
<template>
  <div class="search-result__wrapper">
    <div
      :aria-label="t('searchResultCard.open', [cocktail.name])"
      class="search-result__image-wrapper"
      role="button"
      tabindex="0"
      @click="openCocktailModal(cocktail.id)"
      @keyup.enter="openCocktailModal(cocktail.id)"
    >
      <div
        :style="{background: `url(${cocktail.thumb}/preview)`, backgroundSize: 'cover'}"
        class="search-result__image"
        role="presentation"
      ></div>
      <div class="search-result__shadow">
        {{ cocktail.name }}
      </div>
    </div>
    <ActionButtons :cocktail="cocktail" />
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
