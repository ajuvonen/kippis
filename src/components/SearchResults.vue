<script setup lang="ts">
import type {SearchResultCocktail} from '@/utils/types';
import SearchResultCard from '@/components/SearchResultCard.vue';

defineProps<{
  cocktails: SearchResultCocktail[];
}>();

</script>
<template>
  <ul class="flex flex-auto flex-wrap gap-6 content-start justify-center">
    <li v-for="cocktail in cocktails" :key="cocktail.id">
      <SearchResultCard :cocktail="cocktail" />
    </li>
  </ul>
</template>
