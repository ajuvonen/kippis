import {mount} from '@vue/test-utils';
import {describe, it, expect} from 'vitest';
import type {SearchResultCocktail} from '@/utils/types';
import SearchResults from '@/components/SearchResults.vue';
import SearchResultCard from '@/components/SearchResultCard.vue';
import {testSearchResults} from '@/components/__tests__/mswHandlers';

describe('SearchResults.vue', () => {
  it('renders a list of SearchResultCard components', () => {
    const cocktails: SearchResultCocktail[] = [testSearchResults[0][1], testSearchResults[1][1]];

    const wrapper = mount(SearchResults, {
      props: {
        cocktails,
      },
    });

    const cards = wrapper.findAllComponents(SearchResultCard);
    expect(cards.length).toBe(cocktails.length);

    cards.forEach((card, index) => {
      expect(card.props().cocktail).toEqual(cocktails[index]);
    });
  });

  it('renders no SearchResultCard components when cocktails is empty', () => {
    const wrapper = mount(SearchResults, {
      props: {
        cocktails: [],
      },
    });

    expect(wrapper.findAllComponents(SearchResultCard).length).toBe(0);
  });
});
