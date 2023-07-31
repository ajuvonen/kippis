<script setup lang="ts">
import SearchField from '@/components/SearchField.vue';
import {useCocktailStore} from '@/stores/cocktail';
import {storeToRefs} from 'pinia';

const {searchString, tag} = defineProps<{
  searchString?: string;
  tag?: string;
}>();

const cocktailStore = useCocktailStore();
const {search, searchWithTag} = cocktailStore;
const {searchResults} = storeToRefs(cocktailStore);
</script>
<template>
  <main>
    <search-field />
  </main>
</template>
