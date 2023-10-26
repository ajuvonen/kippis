<script setup lang="ts">
import {useCocktailStore} from '@/stores/cocktail';
import {ALCOHOLS, FRUITS, MIXERS} from '@/utils/constants';
import {computed} from 'vue';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();
const cocktailStore = useCocktailStore();
const {getAllIngredients} = cocktailStore;

const finder = (sources: string[]) =>
  getAllIngredients.filter(
    (candidate) =>
      sources.findIndex((source) => source.toLowerCase() === candidate.toLowerCase()) > -1,
  );

const alcohols = computed(() => finder(ALCOHOLS));
const mixers = computed(() => finder(MIXERS));
const fruits = computed(() => finder(FRUITS));
const others = computed(() =>
  getAllIngredients.filter((ingredient) =>
    !alcohols.value.includes(ingredient) &&
    !mixers.value.includes(ingredient) &&
    !fruits.value.includes(ingredient)
  ),
);
</script>
<template>
  <main class="h-full">
    <h1>{{ t('ingredientsView.title') }}</h1>
    <h2>Alcohols</h2>
    {{ alcohols }}
    <h2>Mixers</h2>
    {{ mixers }}
    <h2>Fruit</h2>
    {{ fruits }}
    <h2>Other cocktail ingredients</h2>
    {{ others }}
  </main>
</template>
<style scoped></style>
