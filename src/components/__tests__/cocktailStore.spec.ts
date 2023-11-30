import {setActivePinia, createPinia} from 'pinia';
import {describe, beforeEach, it, expect} from 'vitest';
import {HttpResponse, http} from 'msw';
import {useCocktailStore} from '@/stores/cocktail';
import {testCocktails, server, testSearchResults} from '@/components/__tests__/mswHandlers';
import {SEARCHABLE_ALCOHOLS} from '@/utils/constants';

const testCocktail = testCocktails[0][1];

describe('Cocktail store', () => {
  let cocktailStore: ReturnType<typeof useCocktailStore>;
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia());
    cocktailStore = useCocktailStore();
  });

  it('adds to selection', async () => {
    expect(cocktailStore.selection).toEqual([]);
    await cocktailStore.addToSelection(0);
    expect(cocktailStore.selection).toEqual([testCocktail]);
  });

  it('does not add to selection if already in selection', async () => {
    cocktailStore.selection.push(testCocktail);
    await cocktailStore.addToSelection(0);
    expect(cocktailStore.selection).toEqual([testCocktail]);
  });

  it('does not add to selection if no cocktail found', async () => {
    await cocktailStore.addToSelection(10);
    expect(cocktailStore.selection).toEqual([]);
  });

  it('does not add to selection if fetch fails', async () => {
    try {
      await cocktailStore.addToSelection(-1);
    } catch (error: any) {
      expect(error.message).toBe('Request failed with status code 404');
    }
    expect(cocktailStore.selection).toEqual([]);
  });

  it('removes from selection', () => {
    cocktailStore.selection.push(testCocktail);
    cocktailStore.removeFromSelection(0);
    expect(cocktailStore.selection).toEqual([]);
  });

  it('opens cocktail modal', async () => {
    expect(cocktailStore.highlightedCocktail).toBeNull();
    await cocktailStore.openCocktailModal(0);
    expect(cocktailStore.highlightedCocktail).toEqual(testCocktail);
  });

  it('does not open modal if cocktail not found', async () => {
    await cocktailStore.openCocktailModal(10);
    expect(cocktailStore.highlightedCocktail).toEqual(null);
  });

  it('does not open modal if fetch fails', async () => {
    try {
      await cocktailStore.openCocktailModal(-1);
    } catch (error: any) {
      expect(error.message).toBe('Request failed with status code 404');
    }
    expect(cocktailStore.highlightedCocktail).toEqual(null);
  });

  it('searches with first letter', async () => {
    server.use(
      http.get(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php',
        ({request}) => {
          const url = new URL(request.url);
          const searchParam = url.searchParams.get('f');
          if (searchParam === 'a') {
            return HttpResponse.json({drinks: [testSearchResults[0][0]]});
          }
          return new HttpResponse(null, {status: 404});
        },
      ),
    );
    await cocktailStore.search('a');
    expect(cocktailStore.searchResults).toEqual([testSearchResults[0][1]]);
  });

  it('searches with search string', async () => {
    server.use(
      http.get(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php',
        ({request}) => {
          const url = new URL(request.url);
          const searchParam = url.searchParams.get('s');
          if (searchParam === 'abc') {
            return HttpResponse.json({drinks: [testSearchResults[0][0]]});
          }
          return new HttpResponse(null, {status: 404});
        },
      ),
      http.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php', ({request}) => {
        const url = new URL(request.url);
        const ingredient = url.searchParams.get('i') || '';
        if (ingredient === 'abc') {
          return HttpResponse.json({drinks: [testSearchResults[1][0]]});
        }
        return new HttpResponse(null, {status: 404});
      }),
    );
    await cocktailStore.search('abc');
    expect(cocktailStore.searchResults).toEqual([testSearchResults[0][1], testSearchResults[1][1]]);
  });

  it('does not search without searchString', async () => {
    server.use(
      http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php', () => {
        throw new Error();
      }),
    );
    await cocktailStore.search('');
    expect(cocktailStore.searchResults).toEqual([]);
  });

  it('searches with all tag ingredients', async () => {
    const requestedIngredients: string[] = [];
    server.use(
      http.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php', ({request}) => {
        const url = new URL(request.url);
        const ingredient = url.searchParams.get('i') || '';
        requestedIngredients.push(ingredient);
        return HttpResponse.json({drinks: null});
      }),
    );
    await cocktailStore.searchWithTag('whiskey');
    expect(requestedIngredients).toEqual(
      SEARCHABLE_ALCOHOLS.find(({tag}) => tag === 'whiskey')?.ingredients,
    );
  });

  it('does not search if tag is not found', async () => {
    const requestedIngredients: string[] = [];
    server.use(
      http.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php', ({request}) => {
        const url = new URL(request.url);
        const ingredient = url.searchParams.get('i') || '';
        requestedIngredients.push(ingredient);
        return HttpResponse.json({drinks: null});
      }),
    );
    await cocktailStore.searchWithTag('lemonade');
    expect(requestedIngredients).toEqual([]);
  });
});
