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
  <div class="flex flex-wrap gap-6 justify-center">
    <SearchResultCard v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>
