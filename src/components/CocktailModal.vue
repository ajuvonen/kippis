<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useCocktailStore} from '@/stores/cocktail';
import {joinIngredients} from '@/utils/helpers';
import ModalComponent from '@/components/ModalComponent.vue';
import ActionButtons from '@/components/ActionButtons.vue';
import LazyCocktailImage from '@/components/LazyCocktailImage.vue';
import CapitalizedList from '@/components/CapitalizedList.vue';
import IconComponent from '@/components/IconComponent.vue';

const cocktailStore = useCocktailStore();
const {highlightedCocktail} = storeToRefs(cocktailStore);

const print = () => window.print();
</script>
<template>
  <ModalComponent
    :title="highlightedCocktail?.name"
    :show="!!highlightedCocktail"
    @close="highlightedCocktail = null"
  >
    <template #content>
      <div class="flex flex-col md:flex-row">
        <CapitalizedList
          :title="$t('cocktailModal.ingredients')"
          :items="joinIngredients(highlightedCocktail?.ingredients)"
          lang="en"
          class="cocktail-modal__ingredients"
        ></CapitalizedList>
        <div class="cocktail-modal__image-wrapper">
          <LazyCocktailImage :src="highlightedCocktail?.thumb" />
          <ActionButtons v-if="highlightedCocktail" :cocktail="highlightedCocktail" />
        </div>
      </div>
      <div v-if="highlightedCocktail?.instructions">
        <h3>{{ $t('cocktailModal.instructions') }}</h3>
        <p lang="en">{{ highlightedCocktail.instructions }}</p>
      </div>
    </template>
    <template #actions>
      <button @click="print()">
        <IconComponent icon="printer" />
        <span>{{ $t('cocktailModal.print') }}</span>
      </button>
    </template>
  </ModalComponent>
</template>
<style scoped>
.cocktail-modal__ingredients {
  @apply md:w-1/2 md:pr-4 order-2 md:order-1;
}

.cocktail-modal__image-wrapper {
  @apply relative md:w-1/2 order-1 md:order-2 rounded-lg overflow-hidden;
}

:deep(.capitalized-list h3) {
  @apply md:mt-0;
}
</style>
