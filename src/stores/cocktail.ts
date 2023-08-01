import {getByIngredients, getBySearchString, getNonAlcoholic} from '@/api';
import {ALCOHOLS} from '@/utils/constants';
import type {SearchResultDrink} from '@/utils/types';
import {defineStore} from 'pinia';

export const useCocktailStore = defineStore('cocktail', {
  state: () => ({
    searchResults: [] as SearchResultDrink[],
    selection: [],
  }),
  getters: {
    isDrinkSelected: (state) => () => {
      return false;
    },
  },
  actions: {
    addToSelection() {},
    removeFromSelection(targetId: number) {},
    async search(searchString: string) {
      this.searchResults = await getBySearchString(searchString);
    },
    async searchNonAlcoholic() {
      this.searchResults = await getNonAlcoholic();
    },
    async searchWithTag(targetTag: string) {
      this.searchResults = await getByIngredients(
        ALCOHOLS.find(({tag}) => targetTag === tag)?.ingredients!,
      );
    },
  },
});
