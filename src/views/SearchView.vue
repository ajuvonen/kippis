<script setup lang="ts">
import {ref, watch} from 'vue';
import {storeToRefs} from 'pinia';
import SearchField from '@/components/SearchField.vue';
import {useCocktailStore} from '@/stores/cocktail';
import {ALCOHOLS} from '@/utils/constants';

const props = defineProps<{
  searchString?: string;
  tag?: string;
}>();

const searchString = ref('');
const cocktailStore = useCocktailStore();
const {search, searchWithTag} = cocktailStore;
const {searchResults} = storeToRefs(cocktailStore);

watch(props, (value) => {
  if (value.tag && ALCOHOLS.filter(({tag}) => tag === value.tag)) {
    searchWithTag(value.tag);
  } else if (value.searchString) {
    searchString.value = value.searchString.trim().slice(0, 20);
    search(searchString.value);
  }
}, {immediate: true});

</script>
<template>
  <main>
    <search-field />
  </main>
</template>
@/utils/constants