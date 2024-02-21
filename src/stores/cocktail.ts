import {
  getByIngredients,
  getBySearchString,
  getDetails,
  getNonAlcoholic,
  getRandomCocktail,
  getByFirstLetter,
} from '@/api';
import {SEARCHABLE_ALCOHOLS} from '@/utils/constants';
import {listUniqueIngredients} from '@/utils/helpers';
import type {FullDetailsCocktail, SearchResultCocktail, SearchStringProps} from '@/utils/types';
import {defineStore} from 'pinia';

export const useCocktailStore = defineStore('cocktail', {
  state: () => ({
    currentSearch: {} as SearchStringProps,
    preventFetch: false,
    searchResults: [] as SearchResultCocktail[],
    selection: [] as FullDetailsCocktail[],
    highlightedCocktail: null as FullDetailsCocktail | null,
  }),
  getters: {
    getAllIngredients: (state): string[] => listUniqueIngredients(state.selection),
  },
  actions: {
    async addToSelection(id: number) {
      if (!this.selection.some((cocktail) => cocktail.id === id)) {
        const cocktail = await getDetails(id);
        if (cocktail && !this.selection.some((cocktail) => cocktail.id === id)) {
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
    async showRandomCocktail() {
      while (this.highlightedCocktail === null) {
        this.highlightedCocktail = await getRandomCocktail();
      }
    },
    removeFromSelection(id: number) {
      this.selection = this.selection.filter((cocktail) => cocktail.id !== id);
    },
    async search(searchString: string) {
      if (searchString.length === 1) {
        this.searchResults = await getByFirstLetter(searchString);
      } else if (searchString.length) {
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
