<script setup lang="ts">
import {computed} from 'vue';
import {storeToRefs} from 'pinia';
import {intersection} from 'remeda';
import {useCocktailStore} from '@/stores/cocktail';
import {ALCOHOLS, FRUITS, MIXERS} from '@/utils/constants';
import {joinIngredients, randomDegree} from '@/utils/helpers';
import useScreen from '@/hooks/screenSize';
import SelectedCocktails from '@/components/SelectedCocktails.vue';
import SelectedCocktailsMobile from '@/components/SelectedCocktailsMobile.vue';
import LazyCocktailImage from '@/components/LazyCocktailImage.vue';
import CapitalizedList from '@/components/CapitalizedList.vue';
import SearchField from '@/components/SearchField.vue';

const cocktailStore = useCocktailStore();
const {getAllIngredients, selection} = storeToRefs(cocktailStore);

const {isSmallScreen} = useScreen();

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
  <SelectedCocktailsMobile v-if="isSmallScreen" />
  <SelectedCocktails v-else />
  <main class="flex-1">
    <h1>{{ $t('instructionsView.title') }}</h1>
    <div v-if="selection.length" class="flex">
      <div class="flex-1">
        <h2>{{ $t('instructionsView.ingredients') }}</h2>
        <CapitalizedList
          :title="$t('instructionsView.alcohols')"
          :items="alcohols"
          lang="en"
        ></CapitalizedList>
        <CapitalizedList
          :title="$t('instructionsView.mixers')"
          :items="mixers"
          lang="en"
        ></CapitalizedList>
        <CapitalizedList
          :title="$t('instructionsView.fruits')"
          :items="fruits"
          lang="en"
        ></CapitalizedList>
        <CapitalizedList
          :title="$t('instructionsView.other')"
          :items="other"
          lang="en"
        ></CapitalizedList>
        <h2>{{ $t('instructionsView.instructions') }}</h2>
        <div v-for="cocktail in selection" :key="cocktail.id" lang="en">
          <CapitalizedList
            :title="cocktail.name"
            :items="joinIngredients(cocktail.ingredients)"
          ></CapitalizedList>
          <p v-if="cocktail.instructions" class="mt-2">{{ cocktail.instructions }}</p>
        </div>
      </div>
      <div class="instructions__cocktail-image-container">
        <figure
          v-for="cocktail in selection"
          :key="cocktail.id"
          :style="`transform: rotate(${randomDegree()}deg);`"
          class="instructions__cocktail-image-wrapper"
        >
          <LazyCocktailImage :src="cocktail.thumb" class="instructions__cocktail-image" />
          <figcaption class="instructions__cocktail-image-label">
            {{ cocktail.name }}
          </figcaption>
        </figure>
      </div>
    </div>
    <div v-else>
      <p class="text-center my-4">{{ $t('instructionsView.noCocktails') }}</p>
      <SearchField :omit-title="true" />
    </div>
  </main>
</template>
<style scoped>
.instructions__cocktail-image-container {
  @apply hidden lg:flex flex-col w-1/3 ml-4;
}

.instructions__cocktail-image-wrapper {
  @apply shadow-sm;
}

.instructions__cocktail-image {
  @apply border-8 border-b-0 border-white;

  &:first-child {
    @apply mt-4;
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
