<script setup lang="ts">
import {watch} from 'vue';
import {useI18n} from 'vue-i18n';
import {storeToRefs} from 'pinia';
import SearchField from '@/components/SearchField.vue';
import SearchResults from '@/components/SearchResults.vue';
import SelectedCocktails from '@/components/SelectedCocktails.vue';
import {useCocktailStore} from '@/stores/cocktail';
import {SEARCHABLE_ALCOHOLS} from '@/utils/constants';
import type {SearchStringProps} from '@/utils/types';

const props = defineProps<SearchStringProps>();

const {t} = useI18n();

const cocktailStore = useCocktailStore();
const {search, searchNonAlcoholic, searchWithTag} = cocktailStore;
const {searchResults, preventFetch, currentSearch} = storeToRefs(cocktailStore);

watch(
  props,
  (newProps) => {
    currentSearch.value = newProps;
    if (!preventFetch.value) {
      if (newProps.tag === 'virgin') {
        searchNonAlcoholic();
      } else if (newProps.tag) {
        searchWithTag(newProps.tag);
      } else if (newProps.searchString) {
        search(newProps.searchString.slice(0, 20));
      } else {
        searchResults.value = [];
      }
    } else {
      preventFetch.value = false;
    }
  },
  {immediate: true},
);
</script>
<template>
  <SelectedCocktails />
  <main class="flex-1">
    <SearchField />
    <h1>{{ t('searchResults.title', [searchResults.length]) }}</h1>
    <SearchResults :cocktails="searchResults" />
  </main>
</template>
