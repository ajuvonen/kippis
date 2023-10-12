<script setup lang="ts">
import {ref, watch} from 'vue';
import {storeToRefs} from 'pinia';
import SearchField from '@/components/SearchField.vue';
import SearchResults from '@/components/SearchResults.vue';
import SelectedDrinks from '@/components/SelectedDrinks.vue';
import {useCocktailStore} from '@/stores/cocktail';
import {ALCOHOLS} from '@/utils/constants';

const props = defineProps<{
  searchString?: string;
  tag?: string;
}>();

const searchString = ref('');
const cocktailStore = useCocktailStore();
const {search, searchNonAlcoholic, searchWithTag} = cocktailStore;
const {searchResults, selection} = storeToRefs(cocktailStore);

watch(
  props,
  (newProps) => {
    if (newProps.tag === 'virgin') {
      searchNonAlcoholic();
    } else if (newProps.tag && ALCOHOLS.filter(({tag}) => tag === newProps.tag)) {
      searchWithTag(newProps.tag);
    } else if (newProps.searchString) {
      searchString.value = newProps.searchString.trim().slice(0, 20);
      search(searchString.value);
    }
  },
  {immediate: true},
);
</script>
<template>
  <div class="flex h-full min-h-0">
    <SelectedDrinks />
    <main class="flex-1">
      <SearchField />
      <SearchResults :items="searchResults" />
    </main>
  </div>
</template>
