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
    preventFetch: false,
    searchResults: [] as SearchResultCocktail[],
    selection: [] as FullDetailsCocktail[],
    highlightedCocktail: null as FullDetailsCocktail | null,
  }),
  getters: {
    // Get a "shopping list" of ingredients. They should be unique, sorted and without some obvious items
    getAllIngredients(state): string[] {
      return pipe(
        state.selection,
        map(({ingredients}) =>
          // Make cream, egg, and citrus fruits show up as their base form 
          ingredients.map(({ingredient}) =>
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
      if (!this.selection.some((cocktail) => cocktail.id === id)) {
        const cocktail = await getDetails(id);
        if (cocktail) {
          this.selection.push(cocktail);
        }
      }
    },
    async openCocktailModal(id: number) {
      const cocktail = await getDetails(id);
      if (cocktail) {
        this.highlightedCocktail = cocktail;
      }
    },
    removeFromSelection(id: number) {
      this.selection = this.selection.filter((cocktail) => cocktail.id !== id);
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
