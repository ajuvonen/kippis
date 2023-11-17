import {
  getByIngredients,
  getBySearchString,
  getDetails,
  getNonAlcoholic,
  getByFirstLetter,
} from '@/api';
import {SEARCHABLE_ALCOHOLS} from '@/utils/constants';
import type {FullDetailsCocktail, SearchResultCocktail, SearchStringProps} from '@/utils/types';
import {defineStore} from 'pinia';
import {pipe, flatten, map, prop, sortBy, uniq, difference} from 'remeda';

export const useCocktailStore = defineStore('cocktail', {
  state: () => ({
    currentSearch: {} as SearchStringProps,
    cocktailDetails: [] as FullDetailsCocktail[],
    preventFetch: false,
    searchResults: [] as SearchResultCocktail[],
    selection: new Set<number>(),
    highlightedCocktail: null as number | null,
  }),
  getters: {
    getCocktailDetails: (state) => (id: number) => state.cocktailDetails.find((cocktail) => cocktail.id === id) || null,
    // Get a "shopping list" of ingredients. They should be unique, sorted and without some obvious items
    getAllIngredients(state): string[] {
      return pipe(
        Array.from(state.selection),
        map((id: number) =>
          // Make cream, egg, and citrus fruits show up as their base form 
          this.getCocktailDetails(id)!.ingredients.map(({ingredient}) =>
            ingredient.replace(/^whipped | peel$| spiral$| white$| yolk$/, ''),
          ),
        ),
        flatten(),
        uniq(),
        difference(['water', 'ice']),
        sortBy(prop(0)),
      );
    },
  },
  actions: {
    async addToSelection(id: number) {
      await this.fetchCocktail(id);
      this.selection.add(id);
    },
    async fetchCocktail(id: number) {
      if (!this.cocktailDetails.some((cocktail) => cocktail.id === id)) {
        this.cocktailDetails.push(await getDetails(id));
      }
    },
    async openCocktailModal(id: number) {
      await this.fetchCocktail(id);
      this.highlightedCocktail = id;
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
      const matchingTag = SEARCHABLE_ALCOHOLS.find((alcohol) => tag === alcohol.tag);
      if (matchingTag) {
        this.searchResults = await getByIngredients(matchingTag.ingredients);
      }
    },
  },
});
