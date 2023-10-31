<script setup lang="ts">
import {useI18n} from 'vue-i18n';
import type {SearchResultDrink} from '@/utils/types';
import SearchResultCard from '@/components/SearchResultCard.vue';

defineProps<{
  items: SearchResultDrink[];
}>();

const {t} = useI18n();
</script>
<template>
  <h1>{{ t('searchResults.title', [items.length]) }}</h1>
  <ul class="flex flex-wrap gap-6 justify-center">
    <li v-for="item in items" :key="item.id">
      <SearchResultCard :item="item" />
    </li>
  </ul>
</template>
