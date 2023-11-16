<script setup lang="ts">
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import {storeToRefs} from 'pinia';
import {useI18n} from 'vue-i18n';
import {useCocktailStore} from '@/stores/cocktail';
import type {SearchResultCocktail} from '@/utils/types';
import LinkButton from '@/components/LinkButton.vue';
import SearchResults from '@/components/SearchResults.vue';

const route = useRoute();
const {t} = useI18n();

const cocktailStore = useCocktailStore();
const {getCocktailDetails} = cocktailStore;
const {selection} = storeToRefs(cocktailStore);

const cocktails = computed(() => {
  return Array.from(selection.value).map((id) => getCocktailDetails(id) as SearchResultCocktail);
});
</script>
<template>
  <Transition>
    <aside v-if="selection.size" class="w-[400px] hidden md:flex flex-col bg-slate-800">
      <h2>{{ t('selectedCocktails.title') }}</h2>
      <SearchResults class="pt-2 mb-4 overflow-y-scroll" :cocktails="cocktails" />
      <LinkButton v-if="route.name === 'search'" to="/ingredients" class="flex-shrink-0">
        {{ t('selectedCocktails.readyButton') }}
      </LinkButton>
      <LinkButton v-else to="/search" class="flex-shrink-0">
        {{ t('selectedCocktails.backButton') }}
      </LinkButton>
    </aside>
  </Transition>
</template>
<style lang="scss" scoped>
.v-enter-to,
.v-leave-from {
  margin-left: 0;
}

.v-enter-active,
.v-leave-active {
  transition: margin 0.2s;
}

.v-enter-from,
.v-leave-to {
  margin-left: -400px;
}
</style>
