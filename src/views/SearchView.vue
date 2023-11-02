<script setup lang="ts">
import {watch} from 'vue';
import {storeToRefs} from 'pinia';
import SearchField from '@/components/SearchField.vue';
import SearchResults from '@/components/SearchResults.vue';
import SelectedDrinks from '@/components/SelectedDrinks.vue';
import {useCocktailStore} from '@/stores/cocktail';
import {SEARCHABLE_ALCOHOLS} from '@/utils/constants';
import type {SearchStringProps} from '@/utils/types';

const props = defineProps<SearchStringProps>();

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
      } else if (newProps.tag && SEARCHABLE_ALCOHOLS.filter(({tag}) => tag === newProps.tag)) {
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
  <SelectedDrinks />
  <main class="flex-1">
    <SearchField />
    <SearchResults :items="searchResults" />
  </main>
</template>
