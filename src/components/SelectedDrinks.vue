<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useI18n} from 'vue-i18n';
import {useCocktailStore} from '@/stores/cocktail';
import SearchResultCard from '@/components/SearchResultCard.vue';
import LinkButton from '@/components/LinkButton.vue';
import type {SearchResultDrink} from '@/utils/types';

const cocktailStore = useCocktailStore();
const {getDrinkDetails} = cocktailStore;
const {selection} = storeToRefs(cocktailStore);
const {t} = useI18n();
</script>
<template>
  <aside
    v-if="selection.size"
    :class="selection.size ? 'w-[400px] px-2' : 'w-0 p-0'"
    class="flex-shrink-0 hidden md:flex flex-col bg-slate-800 h-full"
  >
    <h1>Your Drinks</h1>
    <div class="flex flex-auto flex-wrap pt-2 mb-4 gap-6 justify-center content-start overflow-y-scroll">
      <SearchResultCard
        v-for="id in selection"
        :key="id"
        :item="getDrinkDetails(id) as SearchResultDrink"
      />
    </div>
    <LinkButton to="/ingredients" class="flex-shrink-0">
      {{ t('selectedDrinks.readyButton') }}
    </LinkButton>
  </aside>
</template>
<style lang="scss" scoped></style>
