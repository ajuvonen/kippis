import {
  getByIngredients,
  getBySearchString,
  getDetails,
  getNonAlcoholic,
  getByFirstLetter,
} from '@/api';
import {SEARCHABLE_ALCOHOLS} from '@/utils/constants';
import type {FullDetailsDrink, SearchResultDrink, SearchStringProps} from '@/utils/types';
import {defineStore} from 'pinia';
import {compose, flatten, map, prop, sortBy, uniq, without} from 'ramda';

export const useCocktailStore = defineStore('cocktail', {
  state: () => ({
    currentSearch: {} as SearchStringProps,
    drinkDetails: [] as FullDetailsDrink[],
    preventFetch: false,
    searchResults: [] as SearchResultDrink[],
    selection: new Set<number>(),
  }),
  getters: {
    getDrinkDetails: (state) => (id: number) => state.drinkDetails.find((drink) => drink.id === id),
    // Get a "shopping list" of ingredients. They should be unique, sorted and without some obvious items
    getAllIngredients(state): string[] {
      return compose(
        sortBy(prop(0)),
        without(['water', 'ice']),
        uniq,
        flatten<string[][]>,
        map((id: number) =>
          // Make cream, egg, and citrus fruits show up as their base form 
          this.getDrinkDetails(id)!.ingredients.map(({ingredient}) =>
            ingredient.replace(/^whipped | peel$| spiral$| white$| yolk$/, ''),
          ),
        ),
      )(Array.from(state.selection));
    },
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
        SEARCHABLE_ALCOHOLS.find((alcohol) => tag === alcohol.tag)?.ingredients!,
      );
    },
  },
});
