<script setup lang="ts">
import type {SearchResultCocktail} from '@/utils/types';
import SearchResultCard from '@/components/SearchResultCard.vue';

defineProps<{
  cocktails: SearchResultCocktail[];
}>();

</script>
<template>
  <ul class="search-results">
    <li v-for="cocktail in cocktails" :key="cocktail.id">
      <SearchResultCard :cocktail="cocktail" />
    </li>
  </ul>
</template>
<style lang="scss" scoped>
.search-results {
  @apply flex flex-auto flex-wrap gap-6 content-start justify-center overflow-hidden overflow-y-auto;
}

@media print {
  .search-results {
    @apply grid grid-cols-4 gap-4 place-items-center;
  }
}
</style>
