<script setup lang="ts">
import {useI18n} from 'vue-i18n';
import type {SearchResultCocktail} from '@/utils/types';
import SearchResultCard from '@/components/SearchResultCard.vue';

defineProps<{
  cocktails: SearchResultCocktail[];
}>();

const {t} = useI18n();
</script>
<template>
  <h1>{{ t('searchResults.title', [cocktails.length]) }}</h1>
  <ul class="flex flex-wrap gap-6 justify-center">
    <li v-for="cocktail in cocktails" :key="cocktail.id">
      <SearchResultCard :cocktail="cocktail" />
    </li>
  </ul>
</template>
