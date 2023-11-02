<script setup lang="ts">
import {useRoute} from 'vue-router';
import {storeToRefs} from 'pinia';
import {useI18n} from 'vue-i18n';
import {useCocktailStore} from '@/stores/cocktail';
import SearchResultCard from '@/components/SearchResultCard.vue';
import LinkButton from '@/components/LinkButton.vue';
import type {SearchResultDrink} from '@/utils/types';

const route = useRoute();
const cocktailStore = useCocktailStore();
const {getDrinkDetails} = cocktailStore;
const {selection} = storeToRefs(cocktailStore);
const {t} = useI18n();
</script>
<template>
  <Transition>
    <aside v-if="selection.size" class="w-[400px] hidden md:flex flex-col bg-slate-800">
      <h1>{{ t('selectedDrinks.title') }}</h1>
      <ul
        class="flex flex-auto flex-wrap pt-2 mb-4 gap-6 justify-center content-start overflow-y-scroll"
      >
        <li v-for="id in selection" :key="id">
          <SearchResultCard :item="getDrinkDetails(id) as SearchResultDrink" />
        </li>
      </ul>
      <LinkButton v-if="route.name === 'search'" to="/ingredients" class="flex-shrink-0">
        {{ t('selectedDrinks.readyButton') }}
      </LinkButton>
      <LinkButton v-else to="/search" class="flex-shrink-0">
        {{ t('selectedDrinks.backButton') }}
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
