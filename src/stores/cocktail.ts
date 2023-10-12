import {getByIngredients, getBySearchString, getDetails, getNonAlcoholic, getByFirstLetter} from '@/api';
import {ALCOHOLS} from '@/utils/constants';
import type {FullDetailsDrink, SearchResultDrink} from '@/utils/types';
import {defineStore} from 'pinia';

export const useCocktailStore = defineStore('cocktail', {
  state: () => ({
    searchResults: [] as SearchResultDrink[],
    selection: new Set<number>(),
    drinkDetails: [] as FullDetailsDrink[],
  }),
  getters: {
    getDrinkDetails: (state) => (id: number) => state.drinkDetails.find((drink) => drink.id === id),
  },
  actions: {
    async addToSelection(id: number) {
      if (!this.drinkDetails.some((drink) => drink.id === id)) {
        this.drinkDetails.push(await getDetails(id));
      }
      this.selection.add(id);
    },
    removeFromSelection(id: number) {
      this.selection.delete(id);
    },
    async search(searchString: string) {
      if (searchString.length === 1) {
        this.searchResults = await getByFirstLetter(searchString);
      } else {
        this.searchResults = await getBySearchString(searchString);
      }
    },
    async searchNonAlcoholic() {
      this.searchResults = await getNonAlcoholic();
    },
    async searchWithTag(tag: string) {
      this.searchResults = await getByIngredients(
        ALCOHOLS.find((alcohol) => tag === alcohol.tag)?.ingredients!,
      );
    },
  },
});
