import {setActivePinia, createPinia} from 'pinia';
import {describe, beforeEach, it, expect} from 'vitest';
import {useCocktailStore} from '@/stores/cocktail';
import {testCocktails} from '@/components/__tests__/mswHandlers';

const testCocktail = testCocktails[0][1];

describe('Cocktail store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it('adds to selection', async () => {
    const cocktailStore = useCocktailStore();
    expect(cocktailStore.selection).toEqual([]);
    await cocktailStore.addToSelection(0);
    expect(cocktailStore.selection).toEqual([testCocktail]);
  });

  it('does not add to selection if already in selection', async () => {
    const cocktailStore = useCocktailStore();
    cocktailStore.selection.push(testCocktail);
    await cocktailStore.addToSelection(0);
    expect(cocktailStore.selection).toEqual([testCocktail]);
  });

  it('does not add to selection if no cocktail found', async () => {
    const cocktailStore = useCocktailStore();
    await cocktailStore.addToSelection(10);
    expect(cocktailStore.selection).toEqual([]);
  });

  it('does not add to selection if fetch fails', async () => {
    const cocktailStore = useCocktailStore();
    try {
      await cocktailStore.addToSelection(-1);
    } catch (error: any) {
      expect(error.message).toBe('Request failed with status code 404');
    }
    expect(cocktailStore.selection).toEqual([]);
  });

  it('removes from selection', () => {
    const cocktailStore = useCocktailStore();
    cocktailStore.selection.push(testCocktail);
    cocktailStore.removeFromSelection(0);
    expect(cocktailStore.selection).toEqual([]);
  });

  it('opens cocktail modal', async () => {
    const cocktailStore = useCocktailStore();
    expect(cocktailStore.highlightedCocktail).toBeNull();
    await cocktailStore.openCocktailModal(0);
    expect(cocktailStore.highlightedCocktail).toEqual(testCocktail);
  });

  it('does not open modal if cocktail not found', async () => {
    const cocktailStore = useCocktailStore();
    await cocktailStore.openCocktailModal(10);
    expect(cocktailStore.highlightedCocktail).toEqual(null);
  });

  it('does not open modal if fetch fails', async () => {
    const cocktailStore = useCocktailStore();
    try {
      await cocktailStore.openCocktailModal(-1);
    } catch (error: any) {
      expect(error.message).toBe('Request failed with status code 404');
    }
    expect(cocktailStore.highlightedCocktail).toEqual(null);
  });
});
