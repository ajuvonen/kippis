<script setup lang="ts">
import {computed} from 'vue';
import {useI18n} from 'vue-i18n';
import {storeToRefs} from 'pinia';
import {intersection} from 'remeda';
import {useCocktailStore} from '@/stores/cocktail';
import {ALCOHOLS, FRUITS, MIXERS} from '@/utils/constants';
import {joinIngredients, randomDegree} from '@/utils/helpers';
import SelectedCocktails from '@/components/SelectedCocktails.vue';
import LazyCocktailImage from '@/components/LazyCocktailImage.vue';
import CapitalizedList from '@/components/CapitalizedList.vue';
import SearchField from '@/components/SearchField.vue';

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
</script>
<template>
  <SelectedCocktails />
  <main class="flex-1">
    <h1>{{ t('instructionsView.title') }}</h1>
    <div v-if="selection.length" class="flex flex-row">
      <div class="flex-1">
        <h2>{{ t('instructionsView.ingredients') }}</h2>
        <CapitalizedList
          :title="t('instructionsView.alcohols')"
          :items="alcohols"
        ></CapitalizedList>
        <CapitalizedList :title="t('instructionsView.mixers')" :items="mixers"></CapitalizedList>
        <CapitalizedList :title="t('instructionsView.fruits')" :items="fruits"></CapitalizedList>
        <CapitalizedList :title="t('instructionsView.other')" :items="other"></CapitalizedList>
        <h2>{{ t('instructionsView.instructions') }}</h2>
        <div v-for="cocktail in selection" :key="cocktail.id">
          <CapitalizedList
            :title="cocktail.name"
            :items="joinIngredients(cocktail.ingredients)"
          ></CapitalizedList>
          <p class="mt-2">{{ cocktail.instructions }}</p>
        </div>
      </div>
      <div class="instructions__cocktail-image-container">
        <div
          v-for="cocktail in selection"
          :key="cocktail.id"
          :style="`transform: rotate(${randomDegree()}deg);`"
          class="instructions__cocktail-image-wrapper"
        >
          <LazyCocktailImage :src="cocktail.thumb" class="instructions__cocktail-image" />
          <div class="instructions__cocktail-image-label">
            {{ cocktail.name }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center my-4">{{ t('instructionsView.noCocktails') }}</p>
      <SearchField :omit-title="true" />
    </div>
  </main>
</template>
<style scoped>
.instructions__cocktail-image-container {
  @apply hidden lg:block w-1/3 ml-4;
}

.instructions__cocktail-image-wrapper {
  @apply shadow-sm;
}

.instructions__cocktail-image {
  @apply border-8 border-b-0 border-white;

  &:first-child {
    @apply mt-4;
  }

  + .instructions__cocktail-image {
    @apply mt-8;
  }
}

.instructions__cocktail-image-label {
  @apply bg-white h-12 p-2 text-center whitespace-nowrap overflow-hidden overflow-ellipsis text-3xl;
  font-family: 'Ephesis';
}

@media print {
  .instructions__cocktail-image-container {
    @apply block;
  }

  .instructions__cocktail-image {
    @apply break-inside-avoid;
  }
}
</style>
