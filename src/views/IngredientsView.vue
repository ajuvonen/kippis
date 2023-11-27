<script setup lang="ts">
import {computed} from 'vue';
import {useI18n} from 'vue-i18n';
import {storeToRefs} from 'pinia';
import {intersection} from 'remeda';
import {useCocktailStore} from '@/stores/cocktail';
import {ALCOHOLS, FRUITS, MIXERS} from '@/utils/constants';
import SelectedCocktails from '@/components/SelectedCocktails.vue';

const {t} = useI18n();
const cocktailStore = useCocktailStore();
const {getAllIngredients} = storeToRefs(cocktailStore);

const alcohols = computed(() => intersection(getAllIngredients.value, ALCOHOLS));
const mixers = computed(() => intersection(getAllIngredients.value, MIXERS));
const fruits = computed(() => intersection(getAllIngredients.value, FRUITS));
const others = computed(() =>
  getAllIngredients.value.filter(
    (ingredient) =>
      !alcohols.value.includes(ingredient) &&
      !mixers.value.includes(ingredient) &&
      !fruits.value.includes(ingredient),
  ),
);
</script>
<template>
  <SelectedCocktails />
  <main class="flex-1">
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
