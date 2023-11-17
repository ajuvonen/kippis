import {setActivePinia, createPinia} from 'pinia';
import {describe, beforeEach, it, expect, vi} from 'vitest';
import {useCocktailStore} from '@/stores/cocktail';

describe('Cocktail store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it('adds to selection', async () => {
    const cocktailStore = useCocktailStore();
    cocktailStore.fetchCocktail = vi.fn();
    expect(cocktailStore.selection).toEqual(new Set());
    await cocktailStore.addToSelection(1);
    expect(cocktailStore.fetchCocktail).toHaveBeenCalledWith(1);
    expect(cocktailStore.selection).toEqual(new Set([1]));
  });

  it('does not add to selection if already in selection', async () => {
    const cocktailStore = useCocktailStore();
    cocktailStore.fetchCocktail = vi.fn();
    cocktailStore.selection.add(1);
    await cocktailStore.addToSelection(1);
    expect(cocktailStore.selection).toEqual(new Set([1]));
  });

  it('does not add to selection if fetch fails', async () => {
    const cocktailStore = useCocktailStore();
    cocktailStore.fetchCocktail = vi.fn(() => Promise.reject(new Error('Fetch failed')));
    try {
      await cocktailStore.addToSelection(1);
    } catch (error: any) {
      expect(error.message).toBe('Fetch failed');
    }
    expect(cocktailStore.selection).toEqual(new Set());
  });

  it('removes from selection', () => {
    const cocktailStore = useCocktailStore();
    cocktailStore.removeFromSelection(1);
    expect(cocktailStore.selection).toEqual(new Set());
  });

  it('opens cocktail modal', async () => {
    const cocktailStore = useCocktailStore();
    cocktailStore.fetchCocktail = vi.fn();
    expect(cocktailStore.highlightedCocktail).toBeNull();
    await cocktailStore.openCocktailModal(1);
    expect(cocktailStore.fetchCocktail).toHaveBeenCalledWith(1);
    expect(cocktailStore.highlightedCocktail).toBe(1);
  });

  it('does not open modal if fetch fails', async () => {
    const cocktailStore = useCocktailStore();
    cocktailStore.fetchCocktail = vi.fn(() => Promise.reject(new Error('Fetch failed')));
    try {
      await cocktailStore.openCocktailModal(1);
    } catch (error: any) {
      expect(error.message).toBe('Fetch failed');
    }
    expect(cocktailStore.highlightedCocktail).toEqual(null);
  });
});
