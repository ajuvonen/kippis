import {describe, it, expect, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import SearchView from '@/views/SearchView.vue';
import {useCocktailStore} from '@/stores/cocktail';
import {testSearchResults} from './mswHandlers';

describe('SearchView', () => {
  let cocktailStore: ReturnType<typeof useCocktailStore>;

  beforeEach(() => {
    cocktailStore = useCocktailStore();
  });

  it('renders correctly', () => {
    const wrapper = mount(SearchView);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('searches with tag', () => {
    mount(SearchView, {
      props: {
        tag: 'gin',
      },
    });

    expect(cocktailStore.search).not.toHaveBeenCalled();
    expect(cocktailStore.searchNonAlcoholic).not.toHaveBeenCalled();
    expect(cocktailStore.searchWithTag).toHaveBeenCalledWith('gin');
  });

  it('searches non-alcoholic', () => {
    mount(SearchView, {
      props: {
        tag: 'virgin',
      },
    });

    expect(cocktailStore.search).not.toHaveBeenCalled();
    expect(cocktailStore.searchWithTag).not.toHaveBeenCalled();
    expect(cocktailStore.searchNonAlcoholic).toHaveBeenCalled();
  });

  it('searches with search string', () => {
    mount(SearchView, {
      props: {
        searchString: 'tom',
      },
    });

    expect(cocktailStore.searchNonAlcoholic).not.toHaveBeenCalled();
    expect(cocktailStore.searchWithTag).not.toHaveBeenCalled();
    expect(cocktailStore.search).toHaveBeenCalledWith('tom');
  });

  it('does not search without search string', () => {
    mount(SearchView, {
      props: {
        searchString: '',
      },
    });

    expect(cocktailStore.searchNonAlcoholic).not.toHaveBeenCalled();
    expect(cocktailStore.searchWithTag).not.toHaveBeenCalled();
    expect(cocktailStore.search).not.toHaveBeenCalled();
  });

  it('cuts search string', () => {
    mount(SearchView, {
      props: {
        searchString: 'quite a long string with spaces',
      },
    });

    expect(cocktailStore.searchNonAlcoholic).not.toHaveBeenCalled();
    expect(cocktailStore.searchWithTag).not.toHaveBeenCalled();
    expect(cocktailStore.search).toHaveBeenCalledWith('quite a long string ');
  });

  it('prevents fetch', () => {
    cocktailStore.preventFetch = true;
    mount(SearchView, {
      props: {
        searchString: 'test',
      },
    });

    expect(cocktailStore.searchNonAlcoholic).not.toHaveBeenCalled();
    expect(cocktailStore.searchWithTag).not.toHaveBeenCalled();
    expect(cocktailStore.search).not.toHaveBeenCalled();
    expect(cocktailStore.preventFetch).toBe(false);
  });

  it('displays result count', () => {
    cocktailStore.preventFetch = true;
    cocktailStore.searchResults = [testSearchResults[0][1], testSearchResults[1][1]];
    const wrapper = mount(SearchView, {
      props: {
        searchString: 'test',
      },
    });

    expect(wrapper.find('h1').text()).toBe('Results (2)');
  });
});
