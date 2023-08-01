<script setup lang="ts">
import type {SearchResultDrink} from '@/utils/types';
import { useI18n } from 'vue-i18n';

defineProps<{
  items: SearchResultDrink[];
}>();

const {t} = useI18n();
</script>
<template>
  <h1 class="text-3xl">{{ t('searchResults.title', [items.length]) }}</h1>
</template>
