<script lang="ts" setup>
import {storeToRefs} from 'pinia';
import {useRoute} from 'vue-router';
import {useCocktailStore} from '@/stores/cocktail';
import LinkButton from '@/components/LinkButton.vue';
import SearchResults from '@/components/SearchResults.vue';

const route = useRoute();

const cocktailStore = useCocktailStore();
const {selection} = storeToRefs(cocktailStore);
</script>
<template>
  <h2 class="text-3xl text-center">{{ $t('selectedCocktails.title') }}</h2>
  <SearchResults class="pt-2 mb-4 pb-2 overflow-y-scroll" :cocktails="selection" :preview="false" />
  <LinkButton
    v-if="route.name === 'search'"
    to="/instructions"
    class="flex-shrink-0"
    data-test-id="selected-cocktails__action-button"
  >
    {{ $t('selectedCocktails.readyButton') }}
  </LinkButton>
  <LinkButton
    v-else
    to="/search"
    class="flex-shrink-0"
    data-test-id="selected-cocktails__action-button"
  >
    {{ $t('selectedCocktails.backButton') }}
  </LinkButton>
</template>
