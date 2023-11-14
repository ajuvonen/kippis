<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useI18n} from 'vue-i18n';
import {useCocktailStore} from '@/stores/cocktail';
import IconComponent from '@/components/IconComponent.vue';
import type {SearchResultCocktail} from '@/utils/types';

defineProps<{
  cocktail: SearchResultCocktail;
}>();

const {t} = useI18n();
const cocktailStore = useCocktailStore();
const {selection} = storeToRefs(cocktailStore);
const {addToSelection, removeFromSelection} = cocktailStore;
</script>
<template>
  <button
    v-if="!selection.has(cocktail.id)"
    :aria-label="t('searchResults.addCocktail', [cocktail.name])"
    :data-test-id="`add-cocktail-${cocktail.id}`"
    class="action-button"
    @click="addToSelection(cocktail.id)"
  >
    <IconComponent icon="plus" />
  </button>
  <button
    v-else
    :aria-label="t('searchResults.removeCocktail', [cocktail.name])"
    :data-test-id="`remove-cocktail-${cocktail.id}`"
    class="action-button bg-rose-400 border-slate-800"
    @click="removeFromSelection(cocktail.id)"
  >
    <IconComponent icon="trashCan" />
  </button>
</template>
<style lang="scss" scoped>
.action-button {
  @apply absolute bottom-2 right-2 p-0 m-0 rounded-md w-10 text-lg;
}
</style>
