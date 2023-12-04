<script setup lang="ts">
import {computed} from 'vue';
import {useI18n} from 'vue-i18n';
import {storeToRefs} from 'pinia';
import {intersection} from 'remeda';
import {useCocktailStore} from '@/stores/cocktail';
import {ALCOHOLS, FRUITS, MIXERS} from '@/utils/constants';
import SelectedCocktails from '@/components/SelectedCocktails.vue';
import LazyCocktailImage from '@/components/LazyCocktailImage.vue';
import CapitalizedList from '@/components/CapitalizedList.vue';

const {t} = useI18n();
const cocktailStore = useCocktailStore();
const {getAllIngredients, selection} = storeToRefs(cocktailStore);

const alcohols = computed(() => intersection(getAllIngredients.value, ALCOHOLS));
const mixers = computed(() => intersection(getAllIngredients.value, MIXERS));
const fruits = computed(() => intersection(getAllIngredients.value, FRUITS));
const other = computed(() =>
  getAllIngredients.value.filter(
    (ingredient) =>
      !alcohols.value.includes(ingredient) &&
      !mixers.value.includes(ingredient) &&
      !fruits.value.includes(ingredient),
  ),
);

const randomDegree = () => Math.floor(Math.random() * 8) - 4;
</script>
<template>
  <SelectedCocktails />
  <main class="flex-1">
    <h1>{{ t('selectionView.title') }}</h1>
    <div class="flex flex-row">
      <div class="flex-1">
        <h2>{{ t('selectionView.ingredients') }}</h2>
        <CapitalizedList :title="t('selectionView.alcohols')" :items="alcohols"></CapitalizedList>
        <CapitalizedList :title="t('selectionView.mixers')" :items="mixers"></CapitalizedList>
        <CapitalizedList :title="t('selectionView.fruits')" :items="fruits"></CapitalizedList>
        <CapitalizedList :title="t('selectionView.other')" :items="other"></CapitalizedList>
      </div>
      <div class="selection__cocktail-image-wrapper">
        <LazyCocktailImage
          v-for="cocktail in selection"
          :key="cocktail.id"
          :src="cocktail.thumb"
          :style="`transform: rotate(${randomDegree()}deg);`"
          class="selection__cocktail-image"
        />
      </div>
    </div>
  </main>
</template>
<style scoped>
.selection__cocktail-image-wrapper {
  @apply hidden lg:block w-1/3 ml-4;
}

.selection__cocktail-image {
  @apply border-8 border-slate-100 shadow-sm;

  &:first-child {
    @apply mt-4;
  }

  + .selection__cocktail-image {
    @apply mt-8;
  }
}

@media print {
  .selection__cocktail-image-wrapper {
    @apply block;
  }

  .selection__cocktail-image {
    @apply break-inside-avoid;
  }
}
</style>
