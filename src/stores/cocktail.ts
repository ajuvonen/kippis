import {getNonAlcoholic} from '@/api';
import type { SearchResultDrink } from '@/utils/types';
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
    search(searchString: string) {},
    async searchWithTag(tag: string) {
      if (tag === 'virgin') {
        this.searchResults = await getNonAlcoholic();
        
      }
    },
  },
});
