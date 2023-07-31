import {defineStore} from 'pinia';

export const useCocktailStore = defineStore('cocktail', {
  state: () => ({
    searchResults: [],
    selection:  [],
  }),
  getters: {
    isDrinkSelected: (state) => () => {
      return false;
    },
  },
  actions: {
    addToSelection() {

    },
    removeFromSelection(targetId: number) {

    },
    search(searchString: string) {

    },
    searchWithTag(tag: string) {

    },
  },
});
