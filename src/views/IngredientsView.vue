<script setup lang="ts">
import {computed} from 'vue';
import {useI18n} from 'vue-i18n';
import {storeToRefs} from 'pinia';
import {useCocktailStore} from '@/stores/cocktail';
import {ALCOHOLS, FRUITS, MIXERS} from '@/utils/constants';
import SelectedCocktails from '@/components/SelectedCocktails.vue';

const {t} = useI18n();
const cocktailStore = useCocktailStore();
const {getAllIngredients} = storeToRefs(cocktailStore);

const findFromList = (list: string[]) =>
  getAllIngredients.value.filter((ingredient) => list.includes(ingredient));

const alcohols = computed(() => findFromList(ALCOHOLS));
const mixers = computed(() => findFromList(MIXERS));
const fruits = computed(() => findFromList(FRUITS));
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
