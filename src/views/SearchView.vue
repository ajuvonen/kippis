<script setup lang="ts">
import {watch, ref} from 'vue';
import {storeToRefs} from 'pinia';
import {useCocktailStore} from '@/stores/cocktail';
import type {SearchStringProps} from '@/utils/types';
import useScreen from '@/hooks/screenSize';
import SearchField from '@/components/SearchField.vue';
import SearchResults from '@/components/SearchResults.vue';
import SelectedCocktails from '@/components/SelectedCocktails.vue';
import SelectedCocktailsMobile from '@/components/SelectedCocktailsMobile.vue';

const props = defineProps<SearchStringProps>();

const cocktailStore = useCocktailStore();
const {search, searchNonAlcoholic, searchWithTag} = cocktailStore;
const {searchResults, preventFetch, currentSearch} = storeToRefs(cocktailStore);

const {isSmallScreen} = useScreen();

const searchString = ref('');

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
        searchString.value = newProps.searchString.slice(0, 20);
        search(searchString.value);
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
  <SelectedCocktailsMobile v-if="isSmallScreen" />
  <SelectedCocktails v-else />
  <main class="flex-1">
    <SearchField :initial-value="searchString" />
    <h1>{{ $t('searchResults.title', [searchResults.length]) }}</h1>
    <SearchResults :cocktails="searchResults" />
  </main>
</template>
