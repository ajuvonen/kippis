<script setup lang="ts">
import {ref} from 'vue';
import {useRoute} from 'vue-router';
import {storeToRefs} from 'pinia';
import useScreenSize from '@/hooks/screenSize';
import {useCocktailStore} from '@/stores/cocktail';
import LinkButton from '@/components/LinkButton.vue';
import SearchResults from '@/components/SearchResults.vue';
import IconComponent from '@/components/IconComponent.vue';

const route = useRoute();

const cocktailStore = useCocktailStore();
const {selection} = storeToRefs(cocktailStore);

const {isSmallScreen} = useScreenSize();

const sideBarOpen = ref(false);
</script>
<template>
  <button
    v-if="selection.length && isSmallScreen"
    class="selected-cocktails__mobile-button"
    :aria-label="
      $t(sideBarOpen ? 'selectedCocktails.closeSideBar' : 'selectedCocktails.openSideBar')
    "
    @click="sideBarOpen = !sideBarOpen"
  >
    <IconComponent icon="cocktail" />
    <IconComponent :icon="sideBarOpen ? 'arrowLeft' : 'arrowRight'" />
  </button>
  <Transition>
    <aside v-if="(!isSmallScreen || sideBarOpen) && selection.length" class="selected-cocktails">
      <h2 class="text-3xl text-center">{{ $t('selectedCocktails.title') }}</h2>
      <SearchResults class="pt-2 mb-4 pb-2 overflow-y-scroll" :cocktails="selection" />
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
    </aside>
  </Transition>
</template>
<style lang="scss" scoped>
.selected-cocktails__mobile-button {
  @apply z-20 absolute top-[5.5rem] -left-6 w-12 h-14 pr-0 pl-5 m-0 rounded-md flex flex-col;
}

.selected-cocktails__mobile-button--open {
  left: unset;
  @apply -right-6;
}

.selected-cocktails {
  @apply absolute z-10 w-full h-full md:w-[400px] md:static flex flex-col bg-slate-800;
}

@media print {
  .selected-cocktails {
    @apply hidden;
  }
}

.v-enter-to,
.v-leave-from {
  @apply ml-0;
}

.v-enter-active,
.v-leave-active {
  transition: margin 0.2s;
}

.v-enter-from,
.v-leave-to {
  @apply ml-[-100%] md:ml-[-400px];
}
</style>
