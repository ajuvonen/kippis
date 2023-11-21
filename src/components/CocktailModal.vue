<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useI18n} from 'vue-i18n';
import {useCocktailStore} from '@/stores/cocktail';
import ModalComponent from '@/components/ModalComponent.vue';
import ActionButtons from '@/components/ActionButtons.vue';

const {t} = useI18n();

const cocktailStore = useCocktailStore();
const {highlightedCocktail} = storeToRefs(cocktailStore);
</script>
<template>
  <ModalComponent
    :title="highlightedCocktail?.name"
    :show="!!highlightedCocktail"
    @close="highlightedCocktail = null"
  >
    <div class="flex flex-col md:flex-row">
      <div class="md:w-1/2 md:pr-4 order-2 md:order-1">
        <h3 class="md:mt-0">{{ t('cocktailModal.ingredients') }}</h3>
        <ul>
          <li v-for="ingredient in highlightedCocktail?.ingredients" :key="ingredient.ingredient">
            <span v-if="ingredient.measure" class="pr-1 text-sm uppercase">
              {{ ingredient.measure }}
            </span>
            <span class="text-sm uppercase">{{ ingredient.ingredient }}</span>
          </li>
        </ul>
      </div>
      <div class="relative md:w-1/2 order-1 md:order-2">
        <img :src="highlightedCocktail?.thumb" role="presentation" class="rounded-lg" />
        <ActionButtons v-if="highlightedCocktail" :cocktail="highlightedCocktail" />
      </div>
    </div>
    <div>
      <h3>{{ t('cocktailModal.instructions') }}</h3>
      <p>{{ highlightedCocktail?.instructions }}</p>
    </div>
  </ModalComponent>
</template>
